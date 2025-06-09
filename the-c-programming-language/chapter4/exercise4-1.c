/* Write the function strrindex(s,t), which returns the position of the 
 * rightmost occurrence of t in s, or -1 if there is none.
 */

#include <stdio.h>

#define LIMIT 1000

int getline(char *line, int max);
int strrindex(char *s, char *t);

int main(void) {
    char line[LIMIT];
    char pattern[] = "hello";

    int index;
    if (getline(line, LIMIT) >= 0) {
        index = strrindex(line, pattern);
        printf("%d\n", index);
    }

    return 0;
}

int strrindex(char *s, char *t) {
    int i, j, k;
    int index = -1;
    for (i = 0; s[i] != '\0'; i++) {
        for (j = i, k = 0; t[k] != '\0' && s[j] == t[k]; j++, k++)
            ;
        if (k > 0 && t[k] == '\0')
            index = (i + k - 1);
    }
    return index;
}

int getline(char *line, int max) {
    int c, i;
    for (i = 0; --max > 0 && (c = getchar()) != EOF && c != '\n'; i++)
        line[i] = c;

    if (c == '\n')
        line[i++] = c;
    line[i] = '\0';

    return i;
}
