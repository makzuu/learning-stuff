#include <stdio.h>

/* Write a program to count blanks, tabs, and newlines. */
main()
{
    int blanks = 0, tabs = 0, newlines = 0, c = 0;
    for (; (c = getchar()) != EOF; )
    {
        if (c == ' ')
            ++blanks;
        if (c == '\t')
            ++tabs;
        if (c == '\n')
            ++newlines;
    }
    printf("\nblanks: %d\ntabs: %d\nnew lines: %d\n", blanks, tabs, newlines);
}
