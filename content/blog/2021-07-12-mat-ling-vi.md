---
extra:
  legacy_lang: cmn
  ciemmwue: 于甘肃
title: 个人视觉识别系统（辛丑）
tag: ["design"]
---
<!--more-->

## 要素

### 标准色 

主题色为[潘通 4036 C][main-colour]。
- RGB：`192 154 151`
- CMYK: `17 37 25 4`
- 十六进制：`C09A97`
- HSL：`4° 24.6% 67.3%`

<figure style="max-width:85vw;overflow:auto">
	<table style="line-height:4em;color:white">
		<tr>
<td style="background:rgb(255,255,255)">0</td>
<td style="background:rgb(249,245,245)">1</td>
<td style="background:rgb(242,235,234)">2</td>
<td style="background:rgb(236,225,224)">3</td>
<td style="background:rgb(230,214,213)">4</td>
<td style="background:rgb(224,204,203)">5</td>
<td style="background:rgb(217,194,192)">6</td>
<td style="background:rgb(211,184,182)">7</td>
<td style="background:rgb(204,174,172)">8</td>
<td style="background:rgb(198,164,161)">9</td>
<td style="background:rgb(192,154,151)">0</td>
		</tr>
	</table>
	<figcaption>主题色色阶</figcaption>
</figure>

### 图标

#### 释义

<figure>
	<img src="/gallery/avatar-new.png" alt="N3H" width="256" alt="图标 PNG 预览图" />
	<figcaption>图标形状</figcaption>
</figure>

图标为正方形。「乂」字形和中心矩形变形自[骷髅画][skull]，即颅骨同两根交叉股骨之形，是典型海盗旗样式；「乂」字采取书法形态（由<u>欧阳询</u>「父」字重制而成）并尽量伸展，中心矩形类似[回宫格][hui]，与书法形态相应。

#### 主题色使用

大小矩形及「乂」字形分别采用主题色之 40%、60%、100% 色阶。

#### 圆形变体

<figure>
	<img src="/gallery/avatar-in-circle.png" alt="N3H" width="256" alt="图标之圆形变体 PNG 预览图" />
	<figcaption>图标之圆形变体示例</figcaption>
</figure>

图标可沿外围矩形之内切圆切割使用，但仅限必须使用圆形之场合。

#### 墨稿与反白稿

墨稿用于黑白稿件或特殊工艺。反白稿用于背景较深，无法使用标准色时，注意此种情况下不可带白色背景使用标准色版本。墨稿与反白稿必须依使用环境调整，*以下图片仅为示例*，*不可直接使用*。

墨稿在 HSL 色彩空间采用与印制颜色相同之色相及饱和度。明度与标准色版本一致或适度加深（但在显示器上「乂」字明度不得低于 50%），但差值须按原比例（(1 &#8722; 大矩形明度) &#8758; (1 &#8722; 小矩形明度) &#8758; (1 &#8722; 乂字明度) = 2 &#8758; 3 &#8758; 5）。

<figure>
	<img src="/gallery/avatar-black.png" alt="N3H" width="256" alt="图标墨稿 PNG 预览图" />
	<figcaption>墨稿示例</figcaption>
</figure>

反白稿在 HSL 色彩空间采用与背景相同之色相及饱和度。「乂」字用白色，大矩形明度为 86.9%，小矩形明度为 80.4%，毋须为图标占据矩形范围涂色（即必须保留原背景）。

<figure>
	<img src="/gallery/avatar-white.png" alt="N3H" width="256" alt="图标反白稿 PNG 预览图" />
	<figcaption>反白稿示例</figcaption>
</figure>

#### 安全空间

异于多数同类设计，本图标安全空间为 0。这是因为出于兼容圆形变体已预留足够空间。

### Slogan

<q>俶载南亩，我艺黍稷。</q>

## 资源下载

下载<a href="/gallery/avatar.svg" download>图标</a>！

[main-colour]: https://www.pantone.com/color-finder/4036-C
[skull]: https://en.wikipedia.org/wiki/Skull_and_crossbones_(symbol)
[hui]: https://baike.baidu.com/item/回宫格
[four-corners]: https://zh.wikipedia.org/wiki/四角標圈法
