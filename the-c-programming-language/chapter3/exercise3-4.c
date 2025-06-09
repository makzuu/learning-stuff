/*
 * In a two's complement number representation, our version of itoa does not
 * handle the largest negative number, that is, the value of n equal to 
 * -(2^wordsize-1). Explain why not. Modify it to print that value correctly,
 *  regardless of the machine on which it runs.
 */

/*
 * because the largest negative number is always bigger that the largest positive
 * number
 * example:
 * for a 8bit int the largest negative number is -128 and the largest positive
 * number is 127. therefore when we try to use the unary minus (-) operator to
 * change the sign of -128, nothing changes.
 *
 * n = -128
 * n = -n <- -128
 */

#include <stdio.h>
#include <stdint.h>
#include <string.h>

void reverse(char *s);
void itoa_old(int8_t n, char s[]);
void itoa(int8_t n, char *s);

int main(void) {
    int8_t n = -128;
    char s[10];

    itoa_old(n, s);
    printf("%s\n", s);

    itoa(n, s);
    printf("%s\n", s);

    return 0;
}

void itoa_old(int8_t n, char s[]) {
    int i, sign;

    if ((sign = n) < 0) /* record sign */
        n = -n; /* make n positive */

    i = 0;

    do { /* generate digits in reverse order */
        s[i++] = n % 10 + '0'; /* get next digit */
    } while((n /= 10) > 0); /* delete it */

    if (sign < 0)
        s[i++] = '-';
    s[i] = '\0';
    
    reverse(s);
}

void itoa(int8_t n, char *s) {
    int i, sign;
    
    sign = n < 0 ? 1 : 0;

    i = 0;

    do {
        s[i++] = sign ? -(n % 10) + '0': n % 10 + '0';
    } while ((n /= 10) != 0);

    if (sign) s[i++] = '-';
    s[i] = '\0';
    
    reverse(s);
}


void reverse(char *s) {
    int len = strlen(s);
    int i, j, tmp;
    
    for (i = 0, j = len-1; i < j; i++, j--)
        tmp = s[i], s[i] = s[j], s[j] = tmp;
}
