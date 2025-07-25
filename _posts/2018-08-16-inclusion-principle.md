---
layout: post
title: 从容斥到反演
formula: true
ciemmwue: 于山西
lang: cmn
---

迩来做题接触了些 Möbius 反演、最值反演、二项反演等，总觉其「飘在天上」。在查阅相关离散数学概念后，我决定亲自作一推导，冀能厘清部分缘由。

<!--more-->

## 容斥原理

熟知的容斥原理（Inclusion Principle）形如

\`
\|uuu\_(i=1)^nS\_i\|=sum\_J(-1)^(1+\|J\|)nnn\_(j in J)S\_j\|
\`

作为该公式的一个著名应用，错位排列（Derangement）数⸺\`n\` 个人交换贺卡，每人恰有一张别人的贺卡之情况数⸺为

\`
D\_n=n!-\|uuu\_(i=1)^nS\_i\|=n!-\sum\_(i=1)^n(-1)^(1+i)((n),(i))(n-i)! =n!sum\_(i=0)^n(-1)^i/(i!)
\`

式中，\`S\_i\` 表示 \`i\` 为不动点（持自己的贺卡）的排列集合。（事实上，这里触及容斥原理的一个特例：若 \`\|nnn\_(j in J)S\_j\|\` 只与 \`\|J\|\` 有关，而与 \`J\` 的具体选择无关，则可直接按 \`\|J\|\` 分类求和）

我们观察容斥原理的形式。容斥原理通过计数同在某些集合中的元素，「反解」出至少出现一次（或从未出现⸺据 De Morgan 律）的元素个数。

## 一般的 Möbius 反演

对有限偏序集 \`(:S,<=:)\` 及函数 \`f:S->bbR\`，定义函数

\`
g(x)=sum\_(i<=x)f(i)
\`

我们希望从 \`g(x)\` 反解 \`f(x)\`。形式化表示之，即寻求函数 \`mu:S^2->bbR\`，使

\`
f(x)=\sum\_(i<=x)mu(i,x)g(i)
\`

函数 \`\mu\` 起到对 \`g(i)\` 的「阀门」作用。代入得

\`
f(x)=\sum\_{i\le x}\mu(i,x)\sum\_{j\le i}f(j)
\`

当 \`i=j=x\` 时，\`f(j)\` 取 \`f(x)\`，此时需要「开闸」，即 \`\mu(x,x)=1\`，以保证 \`f(x)\` 项存在。此时在后一个求和号处多加了 \`\sum\_{j\lt x}f(j)\`，因此需要如容斥原理般，等待前一个求和号枚举到这个 \`j\`（即求和变量 \`i\` 取到这个 \`j\`）时，在「阀门」处（即累计到控制这一项的 \`\mu(j,x)\` 上）减去一个 1（实际上是减去一个 \`\mu(x,x)\`）。此时后一个求和号多加了 \`\mu(j,x)\sum\_{j\_1\lt j\lt x}f(j\_1)\`（不是多减了，因为 \`\mu(j,x)\` 作为因数已经包含了这个减号），故在「阀门」处减去一个  \`\mu(j,x)\`……这样每次都减，直至枚举到的 \`j\` 为极小元，才不再引起副作用。对同一个 \`j\` 可能有多次减操作，将这些操作求和，便得到 \`\mu\` 函数。该函数充当反演式的系数，与容斥原理的 \`(-1)^{1+\|J\|}\` 同等。

依上述分析，我们「草拟」一个递推式，以便定义 \`\mu\` 函数

\`
\mu(a,b)=-\sum\_{a\lt i\le b}\mu(i,b)
\`

实用上，\`\mu\` 函数的第二参数为问题的条件，而上式左右两端均用到 \`b\`。我们希望改为左右两端均使用 \`a\` 的形式，使得遇到问题时不需要视问题条件随机应变。

## 引入褶积

我们将目光转向二元函数。设 \`\mathcal F(S)\` 为适合以下性质的函数 \`f:S^2arrow\mathbb R\` 的集合：若 \`a\le b\` 为假，则 \`f(a,b)=0\`。在 \`\mathcal F(S)\` 上定义褶积（Convolution）[^1]运算

\`
(f\*\*g)(a,b)=\sum\_{a\le i\le b}f(a,i)g(i,b)
\`

褶积适合结合律

\`
f\*\*(g\*\*h)=(f\*\*g)\*\*h
\`

只需展开即可得证。显然，褶积有单位元（恒等元）\`\delta(a,b)=\[a=b\]\`。

我们继续寻找 \`f\` 的左逆元 \`g\`，使得 \`g\*\*f=\delta\`。显然，为此应定义 \`g(x,x)=\frac 1{f(x,x)}\`。对 \`a\lt b\` 我们以逸待劳，不从 \`(g\*\*f)\` 的展开出发，而是利用褶积的求和变量范围，拆出 \`g(a,b)\`。代入得：

\`
0=(g\*\*f)(a,b)=\sum\_{a\le i\le b}g(a,i)f(i,b)
=\sum\_{a\le i\lt b}g(a,i)f(i,b)+g(a,b)f(b,b)
\`

移项得

\`
g(a,b)=-\frac{\sum\_{a\le i\lt b}g(a,i)f(i,b)}{f(b,b)}
\`

此为 \`f\` 的左逆元的递推式。同理，\`f\` 有右逆元

\`
h(a,b)=-\frac{\sum\_{a\lt i\le b}f(a,i)h(i,b)}{f(a,a)}
\`

由于

\`
h=\delta\*\*h=(g\*\*f)\*\*h=g\*\*(f\*\*h)=g\*\*\delta=g
\`

两个逆元相等。我们作 \`\mu\` 的左（或右）逆元 \`\zeta\`。当然有 \`\zeta(x,x)=1\`。对于 \`a\le i\lt b to a=i\`，有 \`\zeta(a,b)=-\mu(a,b)=1\`。继续试验，可猜想并以归纳法证得 \`\zeta(a,b)=1\`。\`\zeta\` 可视为偏序 \`(:S,\le:)\`的指示函数，即 \`\zeta(a,b)=\[a\le b\]\`。对 \`\zeta\` 作右逆元，得到前文公式；对 \`\zeta\` 作左逆元，得到的 \`\mu\` 不需要再传递第二参数，目的达成。

由此，「草拟」式可改写为

\`
\mu(a,b)=-\sum\_{a\le i\lt b}\mu(a,i)
\`

## 常规 Möbius 反演⸺应用于整除偏序

整除偏序 \`(:\mathbb N,\preceq:)\`（或进一步地，\`(:\[1,+\infty),\le:)\`）中，定义函数

\`
g(x)=\sum\_{i\preceq x}f(i)
\`

其 Möbius 反演形如

\`
f(x)=\sum\_{i\preceq x}\mu(\frac x i)g(i)
\`

式中，\`\mu(\frac x i)\` 是 \`\mu(1,\frac x i)=\mu(i,x)\` 的缩写。后两者相等是由整除偏序的「同态」所决定。据

\`
\mu(x)=-\sum\_{i\prec x}\mu(i)
\`

显然，\`\mu(1)=1\`，且进一步有 \`\mu(\prod\_{i=1}^np\_{k\_i})=(-1)^n\`（\`k\_i\` 互异）。另有 \`\mu(p\_i^2)=1-1=0\`，进而 \`\mu(p\_i^\alpha)=0(\alpha\gt1),\mu(cp\_i^\alpha)=0\cdot\mu(c)=0\`；即对有平方因子数，\`\mu\` 函数值均为 0。

由此得到常规的 Möbius 反演形式。

## 二项反演⸺应用于格

偏序集 \`(:\mathcal P(S),\subseteq:)\` 是一个格（Lattice）。其中定义函数

\`
g(T)=\sum\_{J\subseteq T}f(J)
\`

其 Möbius 反演形如

\`
f(T)=\sum\_{J\subseteq T}\mu(J,T)g(J)
\`

可以归纳法证明，其 Möbius 函数为：\`\mu(A,B)=\|B\|-\|A\|\`，与容斥原理所得结论一致。

我们先就最值反演（又名 Min-max 容斥）作出尝试。取

\`
f(T)=\[T!=O/\](-1)^{1+\|T\|}\min(T)
\`

有 \`g(T)=\max(T)\`，盖因 \`\max(T)\` 这个数仅在子集 \`\{\max(T)\}\` 中，才能做最小值；而其他值做最小值的集合，其元素个数奇偶参半，于 \`(-1)^{1+\|T\|}\` 相消。得到最值反演

\`
\max(S)=\sum\_{T\subseteq S}(-1)^{1+\|T\|}\min(T)
\`

然而对上式进行 Möbius 反演，只是将最大和最小反向。很遗憾！

考虑函数值仅与集合元素个数有关，而与元素选择无关（在「容斥原理」一节已提到此种特例）。即

\`
G(T)=g(\|T\|)=\sum\_{J\subseteq T}\mu(J,T)F(T)=\sum\_{i=0}^{\|S\|}((\|S\|), (i))f(i)
\`

反演得

\`
f(n)=\sum\_{i=0}^{n}(-1)^{n-i}((n),(i))g(i)
\`

此为二项反演 I。

