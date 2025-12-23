---
title: Number of shapes of Rubik’s snake
extra:
  ciemmwue: mend
---

I wrote a program running on my roommate’s laptop for a day.

<!--more-->

```c
#include <stdio.h>
#include <omp.h>
#define N 24
#define PARALLEL_THRESHOLD 6
#define OUTPUT_THRESHOLD 12

struct Point {
    short x, y, z;
};

struct Block {
    struct Point s, d;
};

struct Point move(struct Point p, short d)
{
    switch (d) {
    case 1:  p.x++; break;  case 2:  p.y++; break;  case 3:  p.z++; break;
    case -1: p.x--; break;  case -2: p.y--; break;  case -3: p.z--; break;
    }
    return p;
}

struct Block extend(struct Block x)
{
    x.s = move(move(x.s, x.d.x), x.d.z);
    short dx = x.d.x;
    x.d.x = -x.d.y;
    x.d.y = -dx;
    x.d.z *= -1;
    return x;
}

struct Point backHelper2(struct Point p, short d)
{
    return d < 0 ? move(p, d) : p;
}

struct Point backHelper(struct Block x)
{
    return backHelper2(backHelper2(backHelper2(x.s, x.d.x), x.d.y), x.d.z);
}

short collapse(struct Block u, struct Block v)
{
    struct Point pu = backHelper(u), pv = backHelper(v);
    return (pu.x == pv.x && pu.y == pv.y && pu.z == pv.z)
           && !((u.d.x == -v.d.x && u.d.y == -v.d.y && u.d.z == v.d.z)
             || (u.d.x == -v.d.y && u.d.y == -v.d.x && u.d.z == -v.d.z));
}

struct Block rotate(struct Block x) 
{
    short dz = x.d.z;
    x.s = move(x.s, dz);
    x.d.z = x.d.y;
    x.d.y = -dz;
    return x;
}

static long long progress_done = 0;
long long count(struct Block blocks[], int p)
{
    long long result = 0;
    if (p == N)
        return 1;
    blocks[p] = extend(blocks[p - 1]);
    #pragma omp parallel for if(p <= PARALLEL_THRESHOLD) reduction(+: result)
    for (int i = 0; i < 4; ++i) {
        struct Block local[N];
        for (int k = 0; k < N; ++k)
            local[k] = blocks[k];
        for (int r = 0; r < i; ++r)
            local[p] = rotate(local[p]);
        for (int j = 0; j < p; ++j)
            if (collapse(local[p], local[j]))
                goto f1;
        result += count(local, p + 1);
        f1: ;
    }
    if (p <= OUTPUT_THRESHOLD) {
        if (p == OUTPUT_THRESHOLD)
            ++progress_done;
        printf("Progress: level %d, partial=%lld, completed=%f%%\n",
                p, result, 100.0 * progress_done / (1ll << (2 * OUTPUT_THRESHOLD)));
    }
    return result;
}

int main()
{
    struct Block blocks[N];
    blocks[0].s.x = blocks[0].s.y = blocks[0].s.z = 0;
    blocks[0].d.z = 1 + (blocks[0].d.y = 1 + (blocks[0].d.x = 1));
    printf("%lld\n", count(blocks, 1));
}
```