/* write a program to copy its input to its output, replacing each string of
 * one or more blanks by a single blank.
 */

#include <stdio.h>

main()
{
    int c, blank;
    blank = 0;
    while ((c = getchar()) != EOF) {
        if (c == ' ') {
            blank = 1;
        } else if (blank == 1) {
            putchar(' ');
            putchar(c);
            blank = 0;
        } else {
            putchar(c);
        }
    }
}
