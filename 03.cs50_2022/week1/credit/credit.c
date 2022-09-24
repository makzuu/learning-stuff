#include <stdio.h>
#include <cs50.h>
#include <math.h>

bool calculate_checksum(long, int);
string get_card_name(long, int);
int len(long);
int start_number(long, int, int);

int main(void)
{
    long card_number = get_long("Number: ");
    int length = len(card_number);
    bool valid = calculate_checksum(card_number, length);

    string card_name = get_card_name(card_number, length);
    printf("%s\n", valid ? card_name : "INVALID");
}

bool calculate_checksum(long number, int length)
{
    int sum_products = 0;
    int sum_others = 0;

    for (int i = 0; i < length; i++)
    {
        int current_number = number % 10;
        number /= 10;

        if (i % 2 == 0)
        {
            sum_others += current_number;
        }
        else
        {
            int product = current_number * 2; 
            if (product > 9)
            {
                int a = product % 10;
                int b = product / 10;
                product = a + b;
            }
            sum_products += product;
        }
    }

    return (sum_products + sum_others) % 10 == 0;
}

string get_card_name(long number, int length)
{
    string card_name = "INVALID";

    int start = start_number(number, length, 2);
    if (length == 15 && (start == 34 || start == 37))
    {
        card_name = "AMEX";
    }

    if (length == 16 && (start == 51 || start == 52 || start == 53 || start == 54 || start == 55))
    {
        card_name = "MASTERCARD";
    }

    start = start_number(number, length, 1);
    if ((length == 13 || length == 16) && start == 4)
    {
        card_name = "VISA";
    }

    return card_name;
}


// calculates the length of number
int len(long number)
{
    int len = 0;
    while (number > 10)
    {
        len++;
        number /= 10;
    }
    len++;

    return len;
}

int start_number(long number, int length, int q)
{
    return number / pow(10, length - q);
}
