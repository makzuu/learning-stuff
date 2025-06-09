/*
 * for (i = 0; i < lim - 1 && (c = getchar()) != '\n' && c != EOF; i++)
 *     s[i] = c;
 */

/*
 * Write a loop equivalent to the for loop above without using && or ||
 */

#include <stdio.h>

#define LIMIT 10

void above(char *s);
void without(char *s);

int main(void) {
    char s[LIMIT];

//     above(s);
//     printf("%s\n", s);

    without(s);
    printf("%s\n", s);

    return 0;
}

void above(char *s) {
    int i, c;
    for (i = 0; i < LIMIT - 1 && (c = getchar()) != '\n' && c != EOF; i++)
        s[i] = c;
    s[i] = '\0';
}

void without(char *s) {
    int i, c;
    for (i = 0; i < LIMIT - 1; i++)
        if ((c = getchar()) != '\n')
            if (c != EOF)
                s[i] = c;
    s[i] = '\0';
}
