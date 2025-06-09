#include <cs50.h>
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

void pusage(void);
bool only_digits(string s);
char rotate(char p_i, int k);

int main(int argc, string argv[]) 
{
    // make sure argc is equal to 2
    // if not print Usage: ./caesar key an exit with status 1
    if (argc != 2)
    {
        pusage();
        return 1;
    }
    
    // make sure all the characters in argv[1] are digits
    // if not print Usage: ./caesar key an exit with status 1
    int k = 0;
    bool odigits = only_digits(argv[1]);
    if (odigits)
    {
        // store argv[1] in k
        k = atoi(argv[1]);
    }
    else 
    {
        pusage();
        return 1;
    }

    // take a string from the user that represents the message to encrypt and store it in plaintext
    // label: "plaintext:  "
    string ptext = get_string("plaintext:  ");
    
    // encrypt the string
    // output the encrypted string and exit with status 0
    // "ciphertext: %s"
    printf("ciphertext: ");
    for (int i = 0, len = strlen(ptext); i < len; i++)
    {
        printf("%c", rotate(ptext[i], k));
    }
    printf("\n");
    return 0;
}

// prints how to use the program
void pusage(void)
{
    printf("Usage: ./caesar key\n");
}

bool only_digits(string s)
{
    bool odigits = true;
    for (int i = 0, len = strlen(s); i < len; i++)
    {
        if (!isdigit(s[i]))
        {
            odigits = false;
            break;
        }
    }
    return odigits;
}

char rotate(char p_i, int k)
{
    char c_i = p_i;
    if (isalpha(p_i))
    {
        if (islower(p_i))
        {
            c_i = (p_i - 97 + k) % 26;
            c_i += 97;
        }
        else 
        {
            c_i = (p_i - 65 + k) % 26;
            c_i += 65;
        }
    }
    return c_i;
}
