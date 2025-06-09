/* Write an alternate version of squeeze(s1, s2) that deletes each charater
 * in s1 that matches any character in the string s2.
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void squeeze(char s[], int c);
void squeeze_new(char *s1, char *s2);
int isin(char c, char *s);

int main(void) {
    char s1[] = "abcd";
    char s2[] = "cb";

    squeeze_new(s1, s2);

    printf("%s\n", s1);

    return 0;
}

void squeeze(char s[], int c) {
    int i, j;

    for (i = j = 0; s[i] != '\0'; i++)
        if (s[i] != c)
            s[j++] = s[i];
    s[j] = '\0';
}

void squeeze_new(char *s1, char *s2) {
    int j = 0;

    for (int i = 0; s1[i] != '\0'; ++i)
        if (isin(s1[i], s2) == 0)
            s1[j++] = s1[i];
    s1[j] = '\0';
}

int isin(char c, char *s) {
    for (int i = 0; s[i] != '\0'; ++i)
        if (s[i] == c)
            return 1;

    return 0;
}
