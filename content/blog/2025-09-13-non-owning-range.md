+++
title = "领有和非领有的 C++ range"
[taxonomies]
  tags = ["C++", "translation"]
[extra]
ciemmwue = "译自 Hannes Hauswedell"
iiia = 0
legacy_lang = "cmn"
custom_head = '''<style>
.ml-author-image img { border-radius: 50%; border: 0.375em solid #57cc8a; padding: 0; opacity: unset }
.ml-article a, .ml-smaller a { --color-heavy: light-dark(#005d58, #57cc8a); border: none; }
.ml-article, h1 { background-color: light-dark(white, #353b43);  }
.skip-link { display: none; }
body { --color-normal: light-dark(#242424, #afbac4); --color-levity: var(--color-normal); --color-background: light-dark(#f6f8fa, black); }
.ml-drawer { --color-normal: light-dark(#005d58, #57cc8a); --color-indication: transparent; }
</style>'''
+++

这是讨论 C++ range 及其 range adaptor 等底层性质系列文章之第一篇。同时，我介绍了意在解决本文所述一些问题的实验性库之设计。

<p class="ml-smaller">译自 <a href="https://hannes.hauswedell.net/">Hannes Hauswedell</a>，<a href="https://hannes.hauswedell.net/post/2025/05/17/non-owning-range/">查看原文</a>。授权方式：<br>© unless otherwise noted: text cc-by-sa, code cc0, photos gplv3。</p>

<!-- more -->

## 前言

C++ range 是 C++20 最紧要特性之一，详参我[之前的文章](https://hannes.hauswedell.net/post/2019/11/30/range_intro/)。我很喜欢 C++ range，在多个项目（主要是生物信息学、数据科学等）大量使用，但我难以说服他人了解其优势。我见到许多程序员对其基本使用仍有困难。自 C++ 初版发布后 ISO 标沝 range 部分又有诸多理念变化，非专业用户必更难理解这些动向。ISO C++ 委员会内部对 C++ range 和 view 至今仍有争议讨论。

我看到当前设计的几个问题，我会逐一撰写博文：

1. 领有／owning 和非领有的 range
2. 待定
3. ……

我会使文章信息量刚刚好，但也提供足够信息了解这一切喧嚣。最后我将介绍我自己能解决一些问题的实验库设计。这是系列的第一篇文章。

> 免责声明：我使用 range 已有段时间，但我明白是其他人将 range 带入标沝。很可能有我未虑及之事，我也认为应当尝试且改进 view 之设计。我对几个问题已多次改变主意，且相信若无前几次设计迭代，我绝无可能得到这些结论。或者借用一位智者的话：
>
> <p style="font-family:'KaiTi','KaiTiGB2312','STKaiti',var(--base-font)">你为什么离开？这样你才能归来。这样你看着来处，才有新的视野与额外的色泽。〔中略〕回到开始的地方不等于从未离开。</p>
> — Terry Pratchett, <cite>A Hat Full of Sky</cite>

## C++17 标沝库

我们从 C++20 以前标沝库的 range 开始，毕竟这是人们最熟知的。注意虽然 range 本身始于 C++17，我将用到后起术语／概念／算法解释彼此关系。记住 C++ 中类型成为 range 只要求 `begin()` 和 `end()`。其馀都是额外的好处 😉。

### 多趟领有 range（容器）

即令没有 range，容器也天然是 range。容器领有／own 自己的元素，即元素存储由容器管理，容器消失时元素便消失。容器是多趟 range，即可以多次迭代，每次看到同样的元素。<sup>ꖻ</sup>

<figure>
<img src="https://1.888440.xyz/global-free/2025/09/15/32/68c8002d51707.webp" alt="用线绑的实体字串" style="max-width: min(100%, 540px)">
<figcaption>字串是容器之一例</figcaption>
</figure>

图上是一种想象容器的方式，一串元素（字符）及控制用数据结构（图上是线和夹子）。有 `begin`（首个字符）和 `end`（线头）。重要的是元素依附于控制数据结构，若移动，元素与容器一併移动，若抽掉线，则字符消失。

```c++
/* 构造与複製 */
std::string s  = "foobar";      // 複製所有字符自静态区至 string [O(n)]
std::string s2 = s;             // 複製所有字符至 s2              [O(n)]

/* 从字串取最小元素 */
char c = *std::ranges::min_element(s);
assert(c == 'a');

/* 试图从临时量取最小元素 */
// char d = *std::ranges::min_element(std::string{"foobar"});
// assert(d == 'a');
```

<figcaption>展示容器语义的代码示例</figcaption>

虽然 `"foobar"` 字串字面量属静态存储，构造分配了新字串[^2]，将字符複製其中。容器管理其元素之内存。复制容器时复制元素（O(n) 时间）。<sup>ꖻ</sup>

[^2]: 容器大多在堆上存储，而 `std::array` 与 C++26 的 `std::inplace_vector` 在栈上存储。`std::string` 是特殊情形，短字串在栈，长字串在堆，但下例均会产生未定义行为。

容器上可以调用 `std::ranges::min_element`，取得指向字典序最小字符的迭代器。字串临时量则不可，因其元素在 `min_element` 返回时超出作用域，故返回的迭代器悬垂。[^3]

[^3]: 事实上 `std::ranges::min_element` 可知迭代器悬垂，只会返回 `std::ranges::dangling`。因此没有未定义行为，但也就找不到最小元素。

### 多趟非领有 range

如果容器是领有的 range，那什么是非领有的？C++17 引入第一个例子：`std::string_view`。一个仅含另一个 range 首末指针[^4] 的 range。

[^4]: `begin` 和 `end`，或等效采用 `begin` 和 `begin` + size。

一般而言，非领有 range 是一类不管理其元素内存的 range。`std::string_view` 便是如此，甚至达到了[借用 range](https://en.cppreference.com/w/cpp/ranges/borrowed_range.html) 的更严要求：该种 range 内只有迭代器，且迭代器不指向 range 本身。个中一个重要含义是当借用 range 自身超出作用域时其迭代器仍有效。这对 `std::string_view` 似乎当然，但稍后我们会遇到需要权衡的设计。

<figure>
<img src="https://1.888440.xyz/global-free/2025/09/15/32/68c8002dddc05.webp" alt="容器在墙上投影（注意悬空的逗号！）" style="max-width: min(100%, 540px)">
<figcaption>如果字串是容器，<code>string_view</code> 象是投下的影子。</figcaption>
</figure>

上图展示了 `string_view` 作为字串的影子：影子能读出相同的字母，並观察到类似字串本身的属性（我的例子中除了颜色 😄）。但影子的存期取决于被投影对象，如果原形移动或销毁，影子也消失，`string_view` 变成悬垂指针。

```c++
/* 构造与複製 */
std::string_view s = "foobar";      // "绑定" s 至静态存区   [O(1)]
std::string_view s2 = s;             // "绑定" s2 至静态存区  [O(1)]

/* 从字串取最小元素 */
char c = *std::ranges::min_element(s);
assert(c == 'a');

/* 从临时对象取最小元素 */
char d = *std::ranges::min_element(std::string_view{"foobar"});
assert(d == 'a');
```

<figure><figcaption>展示借用 range 语义的代码示例</figcaption></figure>

### 单趟 range

单趟 range 不保证可多次遍历，或者褈複遍历时元素可能不同。迭代这种 range 就改变 range。甚至不保证能多次调用 `.begin()` 方法。

<figure>
<img src="https://1.888440.xyz/global-free/2025/09/15/32/68c8002eedc26.webp" alt="打印机" style="max-width: min(100%, 270px)">
<figcaption>单趟字符 range 可类比为打印机正在打印字母</figcaption>
</figure>

概念上，单趟 range 比起元素集合更象「元素生成器」，上图打印机正是意在于此。可以生成一系列䈎面，但䈎面不属于打印机自身，且打印一面后打印机状态会改变。打印机过程可能无限持续，或突然停止。有些打印机能褈启，有些不能 😁

C++20 之前没有专门的单趟 range，也少有单趟迭代器。`std::istream_iterator` 是一例，暴露了输入流的字符。

单趟 range 与领有和非领有的关系复杂：

- 通常是只移动类型，不能复制（不是 O(1) 也不是 O(n)）。
- 元素无所谓领有与不领有，因为通常被立即使用且消耗，指向先前元素的迭代器会失效。
- 从单趟 range 借用没有意义，因为只能有一个有效的迭代器。[^5]

[^5]: 后续博文将解释，不能「只读」借用一个单趟 range，因为单趟 range 不是 const-iterable。而可变借用不会优于直接传递 range 本身，一旦借用，就不能再使用这个 range 了。

因此我建议将单趟 range 作为独立类别保留，不在本文继续讨论。<sup>ꖻ</sup>

## C++2x 标沝库

C++20 是 range 真正落地的版本，整个机制包括概念与算法成为标沝库之一部分。但引入的重要新特性是 range adaptor，range adaptor 是在其他 range 创建的 range[^6]，通常暴露原 range 的子集或转换。有关介绍[请见前文](https://hannes.hauswedell.net/post/2019/11/30/range_intro/)。

[^6]: 有一个歧义，即 range adaptor 是指返回类型（`std::ranges::reverse_view<>` 之特化）还是用以生成该类型的标志（如 `std::views::reverse`）。我用 range adaptor 表示类型，range adaptor 对象表示管道中的对象。视图同样存在歧义，详后。

```c++
std::vector vec{1, 2, 3, 4};
auto v = vec | std::views::VIEW1 | std::views::VIEW2;
// 非领有多趟 range adaptor
```

这是典型「管道」的形状。其声明 `v`，这是 `vec` 上的 range adaptor，经过 `VIEW1` 与 `VIEW2` 表示的转换。`std::string_view` 主要用于字串字面量和子串，而现在允许的操作强大得多，包括

- filter（如：㝻非空格字符）
- 转换（如：转换成大写）
- split 和 join（如：以空格拆分、用分隔符连接）

许多 adaptor 有状态，如 filter 需要存储用于过滤的谓词，join 需要分隔符。另有一些 adaptor 有缓存。状态可以存于 adaptor，或存于迭代器，前者为迭代器节省空间，但使 adaptor 不能成为借用 range（迭代器需要存储指向 adaptor 的指针以访问状态）。

### range-v3 与原版 C++20 的视图

标沝库 range 设计基于 Eric Niebler 的 [range-v3 库](https://github.com/ericniebler/range-v3)，该库推广了「视图」这一术语。

range-v3 的视图定义为 O(1) 可複製的 range。这个「非领有」定义较借用 range 广泛，视图可以保留状态，只要是 O(1)。因此借用 range 是视图的子集[^7]。

[^7]: 若严格遵循标沝，借用 range 不要求无状态。然而，由于借用的前向迭代器可以 O(1) 複製，且与 range 完全独立，因此可以直接获取迭代器且以之构建新 range（该 range 同样可以 O(1) 複製）。 

我在下面讨论这一灵活性是否值得，但要注意，至今视图的定义依然清晰，主要围绕所有权：它意谓着「O(1) 可複製」！然而须知在这一点上视图已不等于 range adaptor。range-v3 与早期 C++20 已有一些自立的 range 亦称为视图，如 `std::ranges::iota_view` 和 `std::ranges::empty_view`（亦可在常量时间复制）。

### P2415 之后（当前状态）

C++20 正式发布前，委员会通过了 [P1456](https://wg21.link/p1456)，允许视图成为只移动类型<sup>ꖻ</sup>。但 C++20 发布后，[P2325](https://wg21.link/p2325) 作为阙陷报告用于 C++20，允许视图不要求可默认构造。我将在下篇博文探讨这两点。

然而最重要也最具争议的改动在 [P2415](https://wg21.link/p2415)，允许视图成为领有 range。该提案亦作为阙陷报告譍用于 C++20，而这是相当重大的设计变更。

```c++
auto to_upper = [] (unsigned char c) { return std::toupper(c); };
std::string s = "foobar";

/* 这原本便可行; v_indiri 依赖 s */
auto v_indiri = s | std::views::transform(to_upper);

/* 这是 "新增" 的; v_owning 自立 */
auto v_owning = std::move(s) | std::views::transform(to_upper);
```

（**译注**：还有[一些问题](https://stackoverflow.com/questions/71954053/what-does-the-vertical-pipe-mean-in-the-context-of-c20-and-ranges)后续修改才解决。）

这是一个有用特性，然而导致 `std::ranges::view` 概念发生变化，不再表示非领有 range。侭管该概念与其他概念联用时仍有些价值<sup>ꖻ</sup>，但我认为其在标沝库的视图机制外已然无用。尤其是它不能用于约束自己的算法，而这是概念的初衷。[^8]

[^8]: C++ 范围之父 Eric Niebler 说过：「泛型编程小技巧：侭管概念是类型的约束，你不能通过查看系统中的类型提炼概念，而是通过研究算法。」不使用该概念的人认为其没有用处。值得注意的是该改动未反向施用于 range-v3。

除了这些（不）实用的影响，还有严重的不明悫性（不可教性）。由于之前的定义广汎传播（且令人难忘），我曾遇到有经验的 C++ 程序员甚至委员会成员讶异于视图不一定是非领有 range。虑及「视图」是 C++ range 最大卖点之一，无法解释「视图」一词之含义是大问题。

鉴于「修复」定义为时已晚，且再次改变会更加引起混乱，**我建议完全避免使用「视图」一词**。

- 用 range adaptor 描述操作（包装）其他 range 的 range。
- 用 range adaptor 对象描述在管道链式调用以创建 range adaptor 的对象[^9]。
- 用非领有 range 表示 O(1) 可複製的 range。
- 用借用 range 表示 O(1) 可複製，且迭代器可超出 range 存期的 range。

[^9]: Boost ranges 称为「range adaptor 生成器」，但现在「生成器」常表示单趟 range。

## RADR 库

> <p style="text-align:center"><span style="font-size:30pt">📡</span><br><a href="https://github.com/h-2/radr">https://github.com/h-2/radr</a></p>
> 我刚才公开了我自己的实验性范围库，名为 ℝange 𝔸𝕕aptors ℝeimagined（radr）。
>
> 其基于 C++20 概念与算法，但替换了 `std::views::*`，且提供相似的用法模式。

请查看且提供反馈！我在本文只会涵盖关于所有权的设计选择，但此库还解决了其他问题，后续会有更多博文。GitHub 仓库的 [docs 文件夹](https://github.com/h-2/radr/tree/main/docs)有详尽文档。

### 非领有 range adaptor

radr 中一切非领有的（多趟）range adaptor 均是借用 range。亦即所有功能以迭代器哨兵对实现，range 没有其他状态。此举代价是迭代器增大，但能显著降低整体复杂度，且为用户提供更简洁的思维模型：

- 只有一种「非领有 range」，不是两种。view 概念与本库完全无关。
- 「借用 range」既符合强定义，也符合实用的「非领有 range」定义。
- range 管道输入借用 range，结果总是借用 range（对 `std::` 不然）。

虽然我认为「借用 range」甚至优于旧的 range-v3 视图概念，避开导致混淆的新视图概念才是开发 radr 的主要动机。

```c++
/* 寻找 vector 之最小非负数 */
std::vector vec{-1, 2, -3, 1, 7};
auto non_neg = [] (int i) { return i >= 0; };

auto it1 = std::ranges::min_element(vec | std::views::filter(non_neg));
// assert(*it == 1);   // 不可用，因 filter_view 未借用

auto it2 = std::ranges::min_element(std::ref(vec) | radr::filter(non_neg));
assert(*it == 1);      // 可用，因所有 radr adaptor 是借用
```

<figcaption>此例显示了该设计选择之一个实际优势</figcaption>

创建间接性的语法在 radr 是显式的（使用 `std::ref()`，详后），但此外其使用方法（如管道）与标沝库完全一致。

关键区别是返回 range 始终是借用 range，因此可以可靠重用迭代器。这类似 [Boost-v2](https://www.boost.io/doc/libs/latest/libs/range/doc/html/index.html) 对 adaptor 的设计。标沝库中一些 adaptor 返回借用 range，但许多重要操作如 `filter` 非然。用户难以判断特定 adaptor 是否如此。[^10]

[^10]: 近期 [P3117](https://wg21.link/P3117) 等提案建议更多 range adaptor 成为借用。

总体而言，radr 尝试仿照 `std::string_view` 行为以处理非领有 range adaptor。该机制自 C++17 起便存在，为众熟知。

### 领有 range adaptor

虽然 P2415 常因引入「领有视图」受到批评，我认为领有 range adaptor 並非问题所在（且很有用！）。问题是「视图」的定义被扩充至包含领有 range adaptor，因而剥离其核心本质：非领有的 range。[^11]

[^11]: 公平言之，由于 P2415 发布相当晚（C++20 发布之后），可选方案相当受限。 

所有故制中，管理其元素内存的 range 即为容器。包装元素右值故而管理其内存的 range adaptor 同样是容器，因其含有元素！不需要引入新概念。Range 默认意义下元素可有任意所有权，惟一需要明悫建模的是 range 是否领有与是否借用。

<div style="display: flex; overflow-x: auto; gap: 1em">
<div>

`std::`

```c++
/* 在临时量创建 adaptor */
auto vue0 = std::vector{1, 2, 3} | std::views::take(2);
/* 移动已有容器 */
std::vector vec{1, 2, 3};
auto vue1 = std::move(vec) | std::views::take(2);
```

</div>

<div>

`radr::`

```c++
/* 在临时量创建 adaptor */
auto rad0 = std::vector{1, 2, 3} | radr::take(2);
/* 移动已有容器 */
std::vector vec{1, 2, 3};
auto rad1 = std::move(vec) | radr::take(2);
```

</div>
</div>

对容器右值包装 radr 库与标沝库可实现相同功能，语法完全一致。但 radr 视返回 range 为容器，可进行 O(n) 複製<sup>ꖻ</sup>。

## 总结

存在领有 range 和非领有 range，借用 range 是后者的严格版本。过去「视图」曾与非领有 range 同义，但视图概念经历多次新定义后已失去实用性。描述 range 最好采用其他明悫无误的术语。另外，range adaptor 这一术语指在其他 range 上操作所得 range。该概念与所有权正交，即 range adaptor 可以指向底层 range，亦可进行封装。

由此可提炼两个关键设计问题：

- 非领有 range adaptor 如何实现？
  - 它们是否全部/部分/完全借用？
- 是否需要领有 range adaptor？若需，如何建模？

标沝库类似 [range-v3](https://github.com/ericniebler/range-v3) 类似，选择部分非领有 range adaptor 采取借用，但多数并非如此。RADR 库类似 [Boost range-v2](https://www.boost.io/doc/libs/latest/libs/range/doc/html/index.html)，选择所有非领有 range adaptor 是借用范围。

标沝库与 RADR 提供领有 range adaptor，Boost range-v2 与 range-v3 则无。标沝库中领有 range adaptor 是一种视图，RADR 中则只是容器。

我已尽力将这个复杂话题分解阐述，但我希望已经说明：「视图」难以解释正是问题所在。radr 库提供十分类似 `std::views` 的功能，同时试图规避部分复杂性。

<p class=ml-smaller><sup>ꖻ</sup>：表示在下篇博文详叙。</p>

<p class=ml-smaller>译者：浅色模式配色是我假想的，起初不相信为此写过<a href="https://hannes.hauswedell.net/post/2023/12/10/darkmode/">一篇 ‘random-nerdiness’</a> 的作者没有侳浅色模式……</p>