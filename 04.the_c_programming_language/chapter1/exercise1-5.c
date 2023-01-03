#include <stdio.h>

main() {
    printf("fahrenheit\tcelcius\n");
    printf("----------\t-------\n");

    for (int fahr = 300; fahr >= 0; fahr = fahr - 20)
    {
        float celsius = (5.0 / 9.0) * (fahr - 32);
        printf("%10d\t%7.1f\n", fahr, celsius);
    }
}
