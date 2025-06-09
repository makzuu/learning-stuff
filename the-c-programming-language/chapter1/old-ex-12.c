#include <stdio.h>

#define NOTCHAR 69
#define CHAR    6969

/* Write a program that prints its input one word per line. */
main()
{
    int state = NOTCHAR;
    for (int c; (c = getchar()) != EOF; )
    {
        if ((c == ' ' || c == '\n' || c == '\t') && state == CHAR)
        {
            putchar('\n');
            state = NOTCHAR;
        }
        else if ((c == ' ' || c == '\n' || c == '\t') && state == NOTCHAR)
        {
            state = NOTCHAR;
        }
        else
        {
            putchar(c);
            state = CHAR;
        }
    }
}
