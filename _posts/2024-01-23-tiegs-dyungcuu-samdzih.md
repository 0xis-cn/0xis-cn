---
layout: post
title: 「挺」的中古三字
lang: cmn
comments: https://botsin.space/@matlingblog/112375821234322641 
nimi: Tieg’s dyungcuu samdzih
no-toc: true
ciemmwue: in Shanxi
---

RIME 给 BYVoid 说是「神级输入法」，这话还在主页耍拉子哩。一看才知是 2012 年写的，发了老半天哩，奈会子黄雀飞做黄码用的都不是 RIME。贾的圈子看的是人人都做编码哩蛮，实际都听梆声哩，隔三间五赶群里「这个方案好，这个以外都不行」或「咨们不直接用那个」，轻飘得很。

切韵拼音有了之后，SyiMyuZya 做了[切韵拼音三拼输入方案](https://github.com/syimyuzya/rime-tupa-sp)，和切韵拼音不搭腔。看见奈会一猛子想起挺（人名）的中古三字也是先有拼音。看着两面个文档思谋一下，还是用了挺的方案，scheme 在群里面，没在 GitHub。原 scheme 屏显挺的全拼，用的潘悟云音系，粗奘奘地转写，嫌难看哩，换了音韵地位。选单窄的哩，多字词又长，音韵地位不能一搭写，比方<u>例</u>字 qieyun-js 的写法是来开三祭去，就成个 <samp>來ᵏ³祭꜄</samp>。

<!--more-->

上面个事一年多了，又有人赶群里谝传，说是中古方案咨们样。虽说是穷极无聊，就想着看看方案，将忘了，看的 scheme 写了表 1 给发了。又看看切韵拼音三拼，想起本来思谋做个内木一郎奈样子的输入法评测系列哩，都给忘了。虽然手机相册总是存的个「宁朴毋华，宁拙毋巧」，我实在不敢把方案道德评价哩，就单令讲几句细节。

<table><caption>表 1　中古三字的韵母</caption><thead><tr><td>平</td><td>o</td><td>i</td><td>u</td><td>q</td><td>n</td><td>m</td></tr><tr><td>上</td><td>x</td><td>e</td><td>v</td><td>g</td><td>r</td><td>f</td></tr><tr><td>去</td><td>h</td><td>y</td><td>w</td><td>j</td><td>l</td><td>b</td></tr><tr><td>入</td><td>—</td><td>—</td><td>—</td><td>k</td><td>t</td><td>p</td></tr></thead><tbody><tr><td>a</td><td>歌开</td><td>泰开</td><td>豪</td><td>唐开</td><td>寒</td><td>谈</td></tr><tr><td>s</td><td>歌合</td><td>泰合</td><td>—</td><td>唐合</td><td>桓</td><td>—</td></tr><tr><td>q</td><td>麻3</td><td>废开</td><td>—</td><td>阳开</td><td>—</td><td>严</td></tr><tr><td>b</td><td>戈合</td><td>废合</td><td>—</td><td>阳合</td><td>—</td><td>凡</td></tr><tr><td>z</td><td>戈开/麻2开</td><td>夬开</td><td>肴</td><td>庚开</td><td>删开</td><td>衔</td></tr><tr><td>x</td><td>麻2合</td><td>夬合</td><td>—</td><td>庚合</td><td>删合</td><td>—</td></tr><tr><td>e</td><td>鱼*</td><td>齐开</td><td>萧</td><td>青开</td><td>先开</td><td>添</td></tr><tr><td>r</td><td>虞*</td><td>齐合</td><td>—</td><td>青合</td><td>先合</td><td>—</td></tr><tr><td>t</td><td>支A开</td><td>祭A开</td><td>宵A</td><td>清开</td><td>仙A开</td><td>盐A</td></tr><tr><td>g</td><td>支B开</td><td>祭B开</td><td>宵B</td><td>庚开</td><td>仙B开</td><td>盐B</td></tr><tr><td>c</td><td>支A合</td><td>祭A合</td><td>—</td><td>清合</td><td>仙A合</td><td>—</td></tr><tr><td>v</td><td>支B合</td><td>祭B合</td><td>—</td><td>庚合</td><td>仙B合</td><td>—</td></tr><tr><td>d</td><td>佳开</td><td>皆开</td><td>—</td><td>耕开</td><td>山开</td><td>咸</td></tr><tr><td>f</td><td>佳合</td><td>皆合</td><td>—</td><td>耕合</td><td>山合</td><td>—</td></tr><tr><td>i</td><td>脂A开</td><td>—</td><td>幽</td><td>东3</td><td>真A</td><td>侵A</td></tr><tr><td>j</td><td>脂A合</td><td>—</td><td>—</td><td>阳开*</td><td>谆</td><td>—</td></tr><tr><td>y</td><td>脂B开</td><td>—</td><td>—</td><td>东3*</td><td>真B开/臻</td><td>侵B</td></tr><tr><td>h</td><td>脂B合</td><td>—</td><td>—</td><td>登合/锺*</td><td>真B合</td><td>—</td></tr><tr><td>o</td><td>咍</td><td>—</td><td>—</td><td>登开</td><td>痕</td><td>覃</td></tr><tr><td>n</td><td>之</td><td>微开</td><td>尤</td><td>蒸</td><td>欣</td><td>—</td></tr><tr><td>m</td><td>之*</td><td>微开*</td><td>尤*</td><td>蒸*</td><td>欣*</td><td>—</td></tr><tr><td>l</td><td>模</td><td>灰</td><td>—</td><td>冬</td><td>魂</td><td>—</td></tr><tr><td>k</td><td>鱼</td><td>—</td><td>—</td><td>江</td><td>元开</td><td>—</td></tr><tr><td>w</td><td>虞</td><td>微合</td><td>—</td><td>锺</td><td>元合</td><td>—</td></tr><tr><td>u</td><td>侯</td><td>—</td><td>—</td><td>东1</td><td>文</td><td>—</td></tr></tbody></table>

中古三字和切韵拼音三拼声母区别不大，都是精庄和端知同键，投端知同键蛮，切韵拼音三拼还有章昌常，中古三字只有昌（有了先例，自然章常也没独立头）。切韵拼音三拼又比中古三字分云匣。统共算起来中古三字用 26 键，切韵拼音用 25 键。两面区分卷舌的压力都在韵母哩，只是中古三字是第二键，切韵拼音三拼是第三键。

元音也差不多，主要是参考音系壤踏的。中古三字庚三清傅在 e 上，切韵拼音（方案所从）傅在 ae 上，[设计思路简介](https://zhuanlan.zhihu.com/p/478751152)解释过了。表 1 的星号就是卷舌，神孤孤的，一刮在第二键。中古三字的第三键就是声调和尾，切韵拼音三拼长下一个 -\* 尾，扯破就是两副脸子，r-\*-Ø 和 r-\*-ng，可理解为「启用切换」，心疼得很。

键位谝达不到点上就不说了，都是就近原则，没有啥区别哩。
