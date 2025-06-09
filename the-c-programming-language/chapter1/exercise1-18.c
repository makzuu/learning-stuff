#include <stdio.h>

#define LIMIT 1000

int readline(char line[], int limit);
void removetabs(char line[], char newline[]);

/* TODO: Write a program to remove trailing blanks and tabs from each line of input, and to delete
 * entirely blank lines. */
int main(void)
{
    char line[LIMIT];
    int lines = readline(line, LIMIT);
    printf("\n>%s", line);
    // char newline[LIMIT];
    // removetabs(line, newline);
    // printf("$%s", newline);

    return 0;
}

void removebl(char line[], char newline[])
{
}

void removetb(char line[], char newline[])
{
}

void removetabs(char line[], char newline[])
{
    int i, c, tabs;
    for (i = 0, tabs = 0; (c = line[i]) != '\0'; ++i)
        if (c == '\t')
            ++tabs;
        else
            newline[i - tabs] = c;

    newline[i - tabs] = '\0';
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
