#include <cs50.h>
#include <stdio.h>
#include <ctype.h>
#include <string.h>
#include <math.h>

int count_letters(string text);
int count_words(string text);
int count_sentences(string text);

int main(void) 
{
    string text = get_string("Text: ");

    int lcount = count_letters(text);
    int wcount = count_words(text);
    int scount = count_sentences(text);

    float L = (float) lcount / wcount * 100;
    float S = (float) scount / wcount * 100;

    int index = round(0.0588 * L - 0.296 * S - 15.8);
    if (index >= 16)
    {
        printf("Grade 16+\n");
    }
    else if (index < 1)
    {
        printf("Before Grade 1\n");
    }
    else
    {
        printf("Grade %d\n", index);
    }
    return 0;
}

int count_letters(string text)
{
    int lcount = 0;
    for (int i = 0, len = strlen(text); i < len; i++)
    {
        if (isalpha(text[i]))
        {
            lcount++;
        }
    }
    return lcount;
}

// TODO: You are, of course, welcome to attempt a solution that will tolerate multiple spaces between words or indeed, no words!
int count_words(string text)
{
    int wcount = 1;
    for (int i = 0, len = strlen(text); i < len; i++)
    {
        if (isspace(text[i]))
        {
            wcount++;
        }
    }
    return wcount;
}

int count_sentences(string text)
{
    int scount = 0;
    for (int i = 0, len = strlen(text); i < len; i++)
    {
        if (text[i] == '.' || text[i] == '!' || text[i] == '?')
        {
            scount++;
        }
    }
    return scount;
}
