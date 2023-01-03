#include <stdio.h>

/* Rewrite the temperature conversion program of section 1.2 to use a function for conversion. */

int tocelsius(int fahr);

int main(void)
{
    int fahr, celsius;
    int lower, upper, step;

    lower = 0;
    upper = 300;
    step = 20;

    fahr = lower;
    while (fahr <= upper)
    {
        celsius = tocelsius(fahr);
        printf("%3d\t%3d\n", fahr, celsius);
        fahr = fahr + step;
    }

}

int tocelsius(int fahr)
{
    return 5 * (fahr - 32) / 9;
}
