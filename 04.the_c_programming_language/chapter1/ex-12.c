/* write a program that prints its input one word per line */

#include <stdio.h>

#define IN  1
#define OUT 0

main()
{
    int c, state;
    state = OUT;
    while ((c = getchar()) != EOF) {
        if (c == ' ' || c == '\t' || c == '\n')
            state = OUT;
        else if (state == OUT) {
            state = IN;
            putchar('\n');
        }
        putchar(c);
    }
}
