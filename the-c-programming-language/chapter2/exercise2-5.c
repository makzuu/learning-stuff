/*
 * Write the function any(s1, s2), which returns the first location in 
 * the string s1 where any character from the string s2 occurs, or -1
 * if s1 contains no characters from s2. (The standard library function
 * strpbrk does the same job but returns a pointer to the location.)
 */

#include <stdio.h>
#include <string.h>

int any(char *s1, char *s2);

int main(void) {
    char s1[] = "abcd";
    char s2[] = "bcd";

    int i = any(s1, s2);
    if (i != -1)
        printf("index: %d\ncharacter: %c", i, s1[i]); 
    else
     printf("s1 contains no characters from s2\n");

    return 0;
}

int any(char *s1, char *s2) {
    for (int i = 0; s1[i] != '\0'; ++i)
        for (int j = 0; s2[j] != '\0'; ++j)
            if (s1[i] == s2[j])
                return i;

    return -1;
}
