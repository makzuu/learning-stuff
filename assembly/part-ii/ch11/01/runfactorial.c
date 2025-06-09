#include <stdio.h>

int factorial(int);

int main(void) {
    int n = 5;
    int result = factorial(n);
    printf("%d! = %d\n", n, result);

    return 0;
}
