#include <stdio.h>

#define MAXLEN 1000
#define NEEDEDLEN 80

int readline(char str[], int maxlen);

/* Write a program to print all input lines that are longer than 80 characters. */
int main(void)
{
    char str[MAXLEN];
    int len;
    while ((len = readline(str, MAXLEN)) > 0)
        if (len > NEEDEDLEN)
            printf("%s", str);

    return 0;
}

int readline(char str[], int maxlen)
{
    int i, c;
    for (i = 0; i < maxlen - 1 && (c = getchar()) != EOF && c != '\n'; ++i)
        str[i] = c;

    if (c == '\n')
    {
        str[i] = c;
        ++i;
    }
    str[i] = '\0';

    return i;
}
