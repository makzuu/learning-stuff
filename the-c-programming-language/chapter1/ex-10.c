/* write a program to copy its input to its output, replacing each tab by \t,
 * each backspace by \b, and each backslash by \\. this make tabs and
 * backspaces visibe in an unambiguous way.
 */

#include <stdio.h>

main()
{
    int c;
    while ((c = getchar()) != EOF) {
        if (c == '\t') {
            printf("\\t");
        } else if (c == '\b') {
            printf("\\b");
        } else if (c == '\\') {
            printf("\\\\");
        } else {
            putchar(c);
        }
    }
}
