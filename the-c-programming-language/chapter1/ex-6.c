/* Verify that the expression getchar() != EOF is O or 1. */

#include <stdio.h>

main()
{
    int c;

    while (c = getchar() != EOF)
        printf("%d", c);            /* prints 1 for any character */
    printf("%d\n", c);              /* prints 0 on EOF            */
                                    /* "hi\nEOF" == 1110          */
}
