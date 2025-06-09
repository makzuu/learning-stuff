/* 
 * Write a function expands(s1, s2) that expands shorthand notations like a-z
 * in the string s1 into the equivalent complete list abc...xyz in s2. Allow
 * for letters of either case and digits, and be prepared to handle cases
 * like a-b-c and a-z0-9 an -a-z. Arrange that a leading or trailing - is taken
 * literally.
 */

/* 
 * expands a-z      = abc...xyz
 * expands A-Z      = ABC...XYZ
 * expands a-b-c    = abbc
 * expands a-z0-9   = abc...xyz012...789
 * expands -a-z     = -abc...xyz
 */

#include <stdio.h>
#include <ctype.h>
#include <string.h>

void expands(char *s1, char *s2);

int main(void) {
    {
        char *s1 = "a-z";
        char s2[500];
        expands(s1, s2);

        printf("%s: %s\n", s1, s2);
    }
    {
        char *s1 = "A-Z";
        char s2[500];
        expands(s1, s2);

        printf("%s: %s\n", s1, s2);
    }
    {
        char *s1 = "a-b-c";
        char s2[500];
        expands(s1, s2);

        printf("%s: %s\n", s1, s2);
    }
    {
        char *s1 = "a-z0-9";
        char s2[500];
        expands(s1, s2);

        printf("%s: %s\n", s1, s2);
    }
    {
        char *s1 = "-a-z";
        char s2[500];
        expands(s1, s2);

        printf("%s: %s\n", s1, s2);
    }
    
    return 0;
}

void expands(char *s1, char *s2) {
    int len = strlen(s1);
    int j = 0;

    for (int i = 0; i < len; i++) {
        int a, b;
        a = b = 0;
        if (s1[i] == '-' &&
                (i - 1) >= 0 &&
                (i + 1) < len &&
                isalnum(s1[i-1]) &&
                isalnum(s1[i+1]))
            b = s1[i-1], a = s1[i+1];
        else if (s1[i] == '-')
         s2[j++] = '-';

        if (b != 0 && a != 0)
            for (; b <= a; b++)
                s2[j++] = b;
    }
    s2[j] = '\0';
}
