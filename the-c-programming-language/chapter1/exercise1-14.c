#include <stdio.h>

#define LETTERS 26

/* Write a program to print a histogram of the frequencies of different characters in its input */
main()
{
    int lower[LETTERS] = { 0 };

    /* count letters */
    for (int c; (c = getchar()) != EOF; )
        if (c >= 'a' && c <= 'z')
            ++lower[c - 'a'];

    /* calculate most frequent letter */
    int mostfrequent = lower[0];
    for (int i = 1; i < LETTERS; ++i)
        if (lower[i] > mostfrequent)
            mostfrequent = lower[i];

    /* print histogram */
    printf("\n\tmost frequent characters:\n\n");
    for (int i = mostfrequent; i > 0; --i)
    {
        printf(" %d", i);
        for (int j = 0; j < LETTERS; ++j)
        {
            printf("\t");
            if (lower[j] >= i)
                printf("##");
        }
        printf("\n");
    }

    for (int i = 0; i < LETTERS; ++i)
        printf("\t%2c", i + 'a');
    printf("\n");
}
