/* write a program to print the corresponding celsius to fahrenheit table */
#include <stdio.h>

// celsius to fahrenheit formula: °F = (9/5) * °C+32
main()
{
    float fahrenheit, celsius;
    int lower, upper, step;

    lower = 0;
    upper = 300;
    step = 20;

    celsius = lower;

    printf("celsius\tfahrenheit\n");
    printf("-------\t----------\n");
    while (celsius <= upper) {
        fahrenheit = (9.0 / 5.0) * celsius + 32.0;
        printf("%7.1f\t%10.1f\n", celsius, fahrenheit);

        celsius = celsius + step;
    }
}
