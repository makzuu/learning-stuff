#include <stdio.h>

/* Write a program to copy its input to its output,
 * replacing each string of one or more blanks by a
 * single blank. 
 */
main()
{
    int c, blanks;

    for (; (c = getchar()) != EOF; )
    {
        if (c != ' ')
        {
            putchar(c);
            blanks = 0;
        }
        else if (c == ' ' && blanks == 0)
        {
            putchar(c);
            ++blanks;
        } else 
        {
            ++blanks;
        }
    }
}
