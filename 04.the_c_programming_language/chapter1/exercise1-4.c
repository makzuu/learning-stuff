#include <stdio.h>

main()
{
    int lower, upper, step;
    lower = 0;
    upper = 300;
    step = 20;

    int celcius, fahrenheit;

    celcius = lower;
    printf("celcius\tfahrenheit\n");
    printf("-------\t----------\n");
    while (celcius <= upper) 
    {
        /*           °C × (9/5) + 32 */
        fahrenheit = celcius * (9.0 / 5.0) + 32;
        printf("%7d\t%10d\n", celcius, fahrenheit);

        celcius = celcius + step;
    }
}

