#include <stdio.h>

main()
{
    /* Verify that the expression getchar() != EOF is 0 or 1 */
    int c;
    while (c = getchar() != EOF)
    {
        printf("%d\n", c);
    }
    printf("%d\n", c);
}
