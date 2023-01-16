/* Write a function rightrot(x, n) that returns the value of the integer x rotated to
 * the right by n bit positions
 */

#include <stdio.h>
#include <stdint.h>

uint8_t rightrot(uint8_t x, uint8_t n);

int main(void) {
    uint8_t b = 45;
    uint8_t ans = rightrot(b, 4);

    printf("%d\n", ans);

    return 0;
}

uint8_t rightrot(uint8_t x, uint8_t n) {
    /*                   45         4  */
    /*             00101101            */

    uint8_t x1 = x & ~(~0 << n); /* 00001101 */
    x1 <<= n;                    /* 11010000 */

    uint8_t x2 = x >> n;         /* 00000010 */

    x = x1 | x2;                 /* 11010010 */ 

    return x;
}
