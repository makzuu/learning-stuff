/*
 * Write the function htoi(s), which converts a string of hexadecimal digits
 * (including an optional 0x or 0X) into its equivalent interger value.
 * The allowable digits are 0 through 9, a through f, and A through F.
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

int htoi(char *s);

int main(void) {
    char *hex = malloc(10);
    if (hex == NULL) return 1;
    strcpy(hex, "0xABC");

    int i = htoi(hex);
    printf("%d\n", i);

    free(hex);
    return 0;
}

int htoi(char *s) { /* just for valid hexadecimal values */
    int d = 0; 

    for (int i = 0; s[i] != '\0'; ++i) {
        char c;

        if (isalpha(s[i])) {
            c = tolower(s[i]); 
            if (c != 'x')
                c = c - 'a' + 10;
            else
                c = 0;
        } else
            c = s[i] - '0';

        d = d * 16 + c;
    }

    return d;
}
