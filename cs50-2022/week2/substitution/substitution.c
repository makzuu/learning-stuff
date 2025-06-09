#include <cs50.h>
#include <stdio.h>
#include <string.h>
#include <ctype.h>

char subs(char p_i, string key);

int main(int argc, string argv[]) 
{
    if (argc != 2)
    {
        printf("Usage: ./substitution key\n");
        return 1;
    }

    string key = argv[1];
    int klen = strlen(key);

    if (klen != 26)
    {
        printf("Key must contain 26 characters.\n");
        return 1;
    }

    char chars[26] = { 0 };
    for (int i = 0; i < klen; i++)
    {
        if (!isalpha(key[i]))
        {
            printf("Key must contain only alphabetic characters\n");
            return 1;
        }

        for (int j = 0; j < i; j++)
        {
            if (key[i] == chars[j])
            {
                printf("Key must not contain repeated characters\n");
                return 1;
            }
        }
        chars[i] = key[i];
    }

    string ptext = get_string("plaintext: ");

    printf("ciphertext: ");
    for (int i = 0, ptlen = strlen(ptext); i < ptlen; i++)
    {
        printf("%c", subs(ptext[i], key));
    }
    printf("\n");

    return 0;
}

char subs(char p_i, string key)
{
    char c_i = p_i;
    if (isalpha(p_i))
    {
        if (islower(p_i))
        {
            c_i = tolower(key[p_i - 97]);
        }
        else
        {
            c_i = toupper(key[p_i - 65]);
        }
    }
    return c_i;
}
