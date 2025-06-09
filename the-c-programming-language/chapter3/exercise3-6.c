/*
 * Write a version of itoa that accepts three arguments instead of two.
 * The third argument is a minimum field width; the converted number
 * must be padded with blanks on the left if necessary to make it wide
 * enough.
 */

#include <stdio.h>
#include <string.h>

void itoa(int n, char *s, int w);
void reverse(char *s);

int main(void) {
    char s[1000];

    int n = 7;
    itoa(n, s, 4); /* ---7 */
    printf("%s\n", s);

    n = 23;
    itoa(n, s, 4); /* --23 */
    printf("%s\n", s);

    n = 0;
    itoa(n, s, 4); /* ---0 */
    printf("%s\n", s);

    n = 4300;
    itoa(n, s, 4); /* 4300 */
    printf("%s\n", s);

    n = 43000;
    itoa(n, s, 4); /* 4300 */
    printf("%s\n", s);

    return 0;
}

void itoa(int n, char *s, int w) {
    int i = 0;

    do {
        int ld = n % 10;
        s[i++] = ld + '0';

        n /= 10;
    } while (n > 0);

    int r = w - i;
    for (int j = 0; j < r; j++)
        s[i++] = ' ';


    s[i] = '\0';
    reverse(s);
}

void reverse(char *s) {
    int l = strlen(s);
    int i, j, tmp;

    for (i = 0, j = l-1; i < j; i++, j--)
        tmp = s[i], s[i] = s[j], s[j] = tmp;
}
