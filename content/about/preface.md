---
title: Anthem
extra:
 custom_head: >-
  <style>
    .fhl { display:inline-block;position:relative;transform:scale(1,1);margin:0em -0.89em 0em -0.18em; }
    .fhl :first-child { display:inline-block;transform:translate(17%,-12%) scale(0.9,0.45) }
    .fhl :last-child { display:inline-block;transform:translate(-80%,15%) scale(0.9,0.55) }
  </style>
---

<p lang=tok>jan Malin li wile e kalama musi tan jan Sate. kalama musi pi jan Malin la, jan Malin li sitelen e toki. tenpo pini la toki ni li kalama musi ala li lipu open pi lipu jan. tenpo ni la jan Malin li lon tomo sona meso li jo e wile sona mute. wile sona wan li open la, jan Malin li toki insa e toki ni tan ni: lawa o kama wawa. ni la, kalama musi ni o jo ala e tenpo kon. mi ken ala sitelen e kalama sama ni la, ilo Suno li sitelen. nasa ante li lon kalama musi ni. mi o toki lon tenpo pona.</p>

<p lang=yue><span class=fhl><span>厶</span><span>云</span></span><span class=fhl><span>大</span><span>仄</span></span>话：「国家有国歌，学校有校歌，人都可以有人歌。」物灵旡个人歌系黎自「征魂序」旡。序系高三时候写定，就衍生出个用途，考前当作脑中急口令 flash back，所以改成歌仲唔得几多气口，我作唔得噉样，所以作曲系 Suno。序仲有一个故事，不过收住见啰。</p>

<details><summary>ABC notation</summary>

    X: 1
    T: 征魂序
    M: 4/4
    L: 1/4
    K: C
    ED/DCD/-|DE/DCA,/|A,EE2|DE/DC3/|
    w:人 类 文 明 倏*尔 有 逝 自 然 造 化 生 杀 未 知
    EDD/CC/|DE/DC3/|DC/DC/D/C/|DE/DCC/|
    w:收 纵 沈 浮 Sus-kind 之 狼 顾 凘 合 消 长 Hei-sen-burg 之 龙 文 使
    GG/GEA/-|A^GEDD/-|DE/DCD/-|DC/DEC/|
    w:天 地 万 緟 溺*皆 将 继 始*终 一 系 物*各 永 旌 热
    CC<CE/E/|D3/E3/E|D/-C/C<CC|DE/(C/C|C3)C/D/|
    w:竭 之 先 何 为 有 我 D-Brane*之 下 幸 以 栖 迟**我
    E<GE/G/E|:G2C/D/E|G2C/C/D/-E/|D/-C/C/C/D/E/C-|
    w:物 灵 久 执 泥 弓 夙 居 蛮 貊 骞 翮 未*就*赤 木 方*成
    w:|潮 茫 茫 舛 错 欲 驰 浮*世*谔 谔 仆*僵
    C3/GG/E|DD/C/C/C/G/-A/|[1G3E/G/-|G2G/G/E:|]
    w:*沦 日 烽 鸣 抚 逍 人 之 空*宇 Woo** 愿 扼 霓 
    w:*罡 风 野 渡 撰 楚 客 之 诳*
    (G4|Gg)C/C/|DD/-E/DC/|C2zzxx|]
    w: 言**猛 回 头 惭*惶 如 彼（不亦痛乎）

</details>

<div id="paper" style="overflow-x: auto" lang=zh></div>

<button type="button" class="ml-menu-button" id=play style="font:inherit; padding: 0.5em">Play</button>

<script type="module" defer>
import abcjs from 'https://cdn.jsdelivr.net/npm/abcjs@6.5.2/+esm';
const visualObj = abcjs.renderAbc('paper', document.querySelector('pre').textContent)[0];
function play() {
    const audioContext = new window.AudioContext();
    audioContext.resume().then(function () {
        const b = new abcjs.synth.CreateSynth();
        return b
        .init({ visualObj, audioContext, millisecondsPerMeasure: visualObj.millisecondsPerMeasure()　})
        .then(function (res) {
            return b.prime();
        }).then(function (res) {
            b.start();
            return Promise.resolve();
        }).catch(function (err) {
            console.warn(err);
        });
    })
}
if (abcjs.synth.supportsAudio())
    document.getElementById('play').onclick = play;
</script>