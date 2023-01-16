/*
 * Write a function setbits(x, p, n, y) that returns x with the n bits that
 * begin at position p set to the rightmost n bits of y, leaving the other
 * bits unchanged
 */

int setbits(int x, int p, int n, int y);

#include <stdio.h>

int main(void) {
    int ans = setbits(75, 4, 2, 58); /* 83 */
    printf("%d\n", ans);

    ans = setbits(2, 1, 2, 1); /* 1 */
    printf("%d\n", ans);

    return 0;
}

int setbits(int x, int p, int n, int y) {
    /* x         p  n  y        */
    /* 01001011, 4, 2, 00111010 */
    y &= ~(~0 << n); /* 00000010 */

    int rh = p + 1 - n;

    y <<= rh; /* 00010000 */

    int xr = x & ~(~0 << rh); /* 00000011 */
    int xl = x & ~0 << (p + 1); /* 01000000 */

    x = xl | y | xr; /* 01010011 */

    return x;
}
