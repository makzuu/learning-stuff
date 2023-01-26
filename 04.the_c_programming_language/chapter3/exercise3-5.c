/*
 * Write the function itob(n,s,b) that converts the integer n into a base b
 * character representation in the string s. In particular, itob(n,s,16)
 * formats n as a hexadecimal integer in s.
 */

#include <stdio.h>
#include <string.h>

void itob(int n, char *s, int b);
void reverse(char *s);

int main(void) {
    int numbers[] = { 32, 45, 103, 234, 10, 0 };
    char s[100];

    int l = sizeof(numbers) / sizeof(int);

    printf("decimal to binary:\n");
    for (int i = 0; i < l; i++) {
        itob(numbers[i], s, 2);
        printf("%d -> %s\n", numbers[i], s);
    }

    printf("decimal to octal:\n");
    for (int i = 0; i < l; i++) {
        itob(numbers[i], s, 8);
        printf("%d -> %s\n", numbers[i], s);
    }

    printf("decimal to hexadecimal:\n");
    for (int i = 0; i < l; i++) {
        itob(numbers[i], s, 16);
        printf("%d -> %s\n", numbers[i], s);
    }
    
    return 0;
}

void itob(int n, char *s, int b) {
    int i = 0;
    do {
        int r = n % b;
        if (b == 16 && r > 9)
            s[i++] = r - 10 + 'A';
        else 
            s[i++] = r + '0';
        n /= b;
    } while ( n > 0);

    s[i] = '\0';
    reverse(s);
}

void reverse(char *s) {
    int len = strlen(s);
    int i, j, tmp;

    for (i = 0, j = len-1; i < j; i++, j--)
        tmp = s[i], s[i] = s[j], s[j] = tmp;
}
