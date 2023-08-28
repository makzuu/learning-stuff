/* write a program to count blanks, tabs, and newlines. */

#include <stdio.h>

main(void)
{
    long blanks, tabs, newlines;
    int c = 0;

    blanks = tabs = newlines = 0;
    while ((c = getchar()) != EOF) {
        if (c == ' ')
            ++blanks;
        if (c == '\t')
            ++tabs;
        if (c == '\n')
            ++newlines;
    }
    printf("blanks: %ld\n", blanks);
    printf("tabs: %ld\n", tabs);
    printf("newlines: %ld\n", newlines);
}
