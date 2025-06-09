/* Write a function rightrot(x, n) that returns the value of the integer x rotated to
 * the right by n bit positions
 */

#include <stdio.h>
#include <stdint.h>

uint8_t rightrot(uint8_t x, uint8_t n);

int main(void) {
    uint8_t b = 88;
    uint8_t ans = rightrot(b, 3); /* 11 */

    printf("%d\n", ans);

    return 0;
}

uint8_t rightrot(uint8_t x, uint8_t n) {
    /*                   88         3  */
    /*             01011000            */

    uint8_t x1 = x & ~(~0 << n); /* 00000000 */
    x1 <<= (sizeof(x) * 8 - n);  /* 00000000 */

    uint8_t x2 = x >> n;         /* 00001011 */

    x = x1 | x2;                 /* 00001011 */ 

    return x;
}
