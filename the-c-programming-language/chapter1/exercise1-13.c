#include <stdio.h>

#define ARRAYLEN 10
#define IN        1
#define OUT       0

/* Write a program to print a histogram of the lengths of words in its input. It is easy to draw
 * the histogram with the bars horizontal; a vertical orientation is more challenging. */
main()
{
    int wordlen[ARRAYLEN] = { 0 };
    int state = OUT;
    int chcount = 0;

    /* get word length */
    for (int c; (c = getchar()) != EOF; )
    {
        if (c != ' ' && c != '\t' && c != '\n')
        {
            chcount++;
            state = IN;
        }
        else if (state == IN)
        {
            if (chcount > 10)
            {
                printf("maximun word length (10) execeded\n");
                return 1;
            }
            wordlen[chcount - 1]++;
            chcount = 0;
            state = OUT;
        }
    }

    /* draw histogram */
    printf("\nword length histogram:\n\n");
    for (int i = ARRAYLEN; i > 0; i--)
    {
        printf("%2d", i);
        for (int j = 0; j < ARRAYLEN; j++)
        {
            printf("\t");
            if (wordlen[j] >= i)
                printf("||");
        }
        printf("\n");
    }
    for (int i = 1; i <= ARRAYLEN; i++)
        printf("\t%2d", i);
    printf("\n");

}
