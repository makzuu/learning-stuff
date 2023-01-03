#include <stdio.h>

#define LIMIT 1000

int readline(char line[], int limit);
void reverse(char s[]);
int len(char s[]);

/* Write a function reverse(s) that reverses the character string s. Use it to write a program
 * that reverses its input a line at a time. */
int main(void)
{
    int len;
    for (char line[LIMIT]; (len = readline(line, LIMIT)) > 1; )
    {
        reverse(line);
        printf("%s", line);
    }

    return 0;
}

int len(char s[])
{
    int i;
    for (i = 0; s[i] != '\0'; ++i)
        ;
    return i;
}

void reverse(char s[])
{
    int l = len(s);
    int i = 0, j = l - 2;
    for (; i < j; ++i, --j)
    {
        int tmp = s[i];
        s[i] = s[j];
        s[j] = tmp;
    }
}

int readline(char line[], int limit)
{
    int i, c;
    for (i = 0; i < limit - 2 && (c = getchar()) != EOF && c != '\n'; ++i)
        line[i] = c;

    line[i] = '\n';
    line[++i] = '\0';

    return i;
}
