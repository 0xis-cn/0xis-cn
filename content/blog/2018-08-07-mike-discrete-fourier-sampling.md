---
title: 离散傅里叶变换
extra:
  legacy_lang: cmn
  ciemmwue: 于山西
  formula: true
---

考虑傅里叶级数

<!--more-->

\`
f(x)=sum _ (n=-oo)^(+oo) a_n exp(\"j\"nx) = sum _ (n=-oo)^(+oo) a_n (cos nx+\"j\"sin nx)
\`

其中

\`
int _ -pi ^ pi f(x) exp(-\"j\"mx) \"d\"x = int _ -pi ^ pi sum _ (n=-oo)^(+oo) a_n exp(\"j\"(n-m)x)
= sum _ (n=-oo)^(+oo) a_n int _ -pi ^ pi exp(\"j\"(n-m)x) = 2pi sum _ (n=-oo)^(+oo) a_n [n=m] = 2pi a_m
\`

即

\`
a_m=1/2pi int _ -pi ^ pi f(x) exp(-\"j\"mx) \"d\"x
\`

在任意周期下可得

\`
f(x)=sum _ (n=-oo)^(+oo) a_n exp((2pi)/l \"j\"nx)
\`<br>
\`
a_m=1/l int _ -l ^ l f(x) exp(-(2pi)/l \"j\"mx) \"d\"x
\`

这不只是假设的权宜。由傅里叶级数我们得到一列离散的强度 \`a_n\`。为使提取的强度不依赖周期，在 \`l->oo\` 时，有以 \`k=n/l\` 为参数的函数。在上式作这个代换，可以写出

\`
f(x)=sum _ (n=-oo)^(+oo) int _ -oo ^ (+oo) F(k) exp(2pi \"j\"kx) \"d\"x
\`<br>
\`
F(k)= int _ -oo ^ (+oo) f(x) exp(-2pi \"j\"kx) \"d\"x
\`

[^wdd]: 或 \`F(w)= int _ -oo ^ (+oo) f(x) exp(-\"j\"wx) \"d\"x\`。以无穷为界只是习惯写法，不代表变换的敛散值得考虑。

\`F(x)\`[^wdd] 称为 \`f(x)` 的傅里叶变换，与之相对的是傅里叶逆变换。

傅里叶变换刻画了连续函数 `f`。对离散信号 \`x_N\`，表示为 \`f(kT)\`，则

\`
X_n=F(n/N T) = int _ -oo ^ (+oo) f(x) exp(-2pi n\"j\"Tx) \"d\"x = sum _ (k=0) ^ (N-1) x_k exp(-2pi \"j\"kn/N)
\`

即

\`
X_n = sum _ (k=0) ^ (N-1) x_k exp(-2pi \"j\"kn/N)
\`

与之相对的是逆变换

\`
x_n = 1/N sum _ (k=0) ^ (N-1) X_k exp(2pi \"j\"kn/N)
\`

因此，朴素实现在 O(N²) 变换全序列。

快速傅里叶变换（FFT）在 O(N lg N) 变换全序列，其基于下述分解：当 N 是 2 的幂时

\`
sum _ (k=0) ^ (N-1) x_k exp(-2pi \"j\"kn/N) = sum _ (k=0) ^ (N/2-1) x_(2k) exp(-2pi \"j\"kn/(N/2)) + exp(-2pi \"j\"k/N) sum _ (k=0) ^ (N/2-1) x_(1+2k) exp(-2pi \"j\"kn/(N/2))
\`

够了么？不！注意还有一个参数 n！在 \`n > N/2\` 时子问题的 k 超范围，我们增加下式保证分后范围，其中负号由于 \`-1=exp(-pi \"j\")\`：

\`
sum _ (k=0) ^ (N-1) x_k exp(-2pi \"j\"k(n+N/2)/N) = sum _ (k=0) ^ (N/2-1) x_(2k) exp(-2pi \"j\"kn/(N/2)) - exp(-2pi \"j\"k/N) sum _ (k=0) ^ (N/2-1) x_(1+2k) exp(-2pi \"j\"kn/(N/2))
\`

上两式记作 (†) 式。注意该式**左侧关于前后，右侧关于奇偶**。因此，二基数 FFT 可用以下递归过程表示：

```cpp
void fft_recursive(complex a[], complex res[], int al, int ar, int is) {
  int mid = al + ar >> 1, len = ar - al >> 1;
  std::copy(a + al, a + ar, res + al); if (ar - al == 1) return;
  for (int i = 0; i < len; ++i) a[al + i] = res[al + lc(i)], a[(al + ar) / 2 + i] = res[al + rc(i)];
  fft_recursive(a, res, al, mid, is), fft_recursive(a, res, mid, ar, is);
  for (int i = 0; i < ar - mid; ++i) res[mid + i] *= exp(2 * PI * I * is * i / len); // (*)
  for (int i = 0; i < len; ++i) { complex b = res[al + i], c = res[mid + i]; res[al + i] += c, res[mid + i] = b - c; }}
```

其中 (\*) 式表示项 \`exp(-2pi \"j\"k/N)\`，末行表示 (†) 式。

递归过程计 lg N 层，各层差别在处理顺序，即奇偶到前后的重排。要之，(\*) 以原奇偶选中，(†) 式则是相邻二者的配对。好在递归过后自 (\*) 开始不必重排，递归中的重排发生于块内，未影响 `res[al + i]` 与 `res[mid + i]` 的先后。因此我们只需起头便移到上述 `a[]` 的末态。

> 来段没营养的废话。我们这样考虑推移过程，对节长 l，~~该步选取 l 所在位为 1 者~~长为 l 的块依次为前、后、前、后……且序号低于（含）l 的部分（模 2l 馀数）循环移位，即抽出奇偶，放到 l 处。由于 l 从高到低，得到的是原序号的位翻转。恰好处在原序号位翻转的项亦交换至原序号。

```cpp
int revbin_gen(int r, int n) {
  do if (n & (r ^= n)) return r; while (n >>= 1); }
void revbin_permute(complex a[], int n) {
  for (int i = 0, r = 0; i < n; ++i, r = revbin_gen(r, n / 2)) if (r > i) swap(a[i], a[r]); }
void fft(complex a[], int n, int ls) {
  revbin_permute(a, n);
  for (int l = 1; l < n; l <<= 1) for (int j = 0; j < l; ++j)
    for (int i = 0, z = exp(PI * I * is * j / l); i < n; i += l) {
      complex b = a[i + j], c = z * a[i + j + l]; a[i + j] = b + c, a[i + j + l] = b - c; }}
```