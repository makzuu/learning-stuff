/*
 * Write a function invert(x,p,n) that returns x with the n bits that begin at
 * position p inverted (i.e., 1 changed into 0 and vice versa), leaving the others
 * unchanged
 */

#include <stdio.h>

int invert(int x, int p, int n);

int main(void) {
    int ans = invert(2, 2, 1); /* 6 */
    printf("%d\n", ans);

    ans = invert(6, 3, 2); /* 10 */
    printf("%d\n", ans);

    return 0;
}

int invert(int x, int p, int n) {
    /*         2      2      1 */
    /*     00000010            */

    int lx = x & ~0 << (p + 1);               /* 00000000 */ 
    int rx = x & ~(~0 << (p + 1 - n));        /* 00000010 */

    int mx = x >> (p + 1 - n);                /* 00000000 */
    mx = ~mx;                                 /* 11111111 */
    mx &= ~(~0 << n);                         /* 00000001 */
    mx <<= (p + 1 - n);                       /* 00000100 */

    x = lx | mx | rx;                         /* 00000110 */

    return x;
}
