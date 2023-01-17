/* In a two's complement number system, x &= (x - 1) deletes the rightmost 
 * 1-bit in x. Explain why. Use this observation to write a faster version of 
 * bitcount.
 */

/* 
 * When substracting by 1 the rightmost bit will change from 1 to 0
 * or from 0 to 1
 *
 * and 0 & 1 = 0
 *     1 & 0 = 0
 *
 * example: 
 *                   v
 * x     = 2 = 0 0 1 0
 * x - 1 = 1 = 0 0 0 1
 *
 *                   v
 *             0 0 1 0
 *          &  0 0 0 1
 *             -------
 *          =  0 0 0 0
 *
 *  another example:
 *                    v
 *  x     = 6 = 0 1 1 0
 *  x - 1 = 5 = 0 1 0 1
 *
 *                    v
 *              0 1 1 0
 *          &   0 1 0 1
 *              -------
 *          =   0 1 0 0
 */

#include <stdio.h>

int bitcount(unsigned x);
int faster(unsigned x);

int main(void) {
    printf("bitcount: %d\n", bitcount(4)); /* 1 */
    printf("faster  : %d\n", faster(4));   /* 1 */

    printf("bitcount: %d\n", bitcount(5)); /* 2 */
    printf("faster  : %d\n", faster(5));   /* 2 */

    printf("bitcount: %d\n", bitcount(7)); /* 3 */
    printf("faster  : %d\n", faster(7));   /* 3 */

    printf("bitcount: %d\n", bitcount(15)); /* 4 */
    printf("faster  : %d\n", faster(15));   /* 4 */

    printf("bitcount: %d\n", bitcount(0)); /* 0 */
    printf("faster  : %d\n", faster(0));   /* 0 */

    return 0;
}

int faster(unsigned x) {
    int i;
    for (i = 0; x != 0; x &= (x - 1))
        i++;

    return i;
}

int bitcount(unsigned x) {
    int b;

    for (b = 0; x != 0; x >>= 1)
        if (x & 01)
            b++;

    return b;
}
