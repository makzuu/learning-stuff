/* Rewrite the function lower, which converts upper case letters to lower case,
 * with a conditional expression instead of if-else.
 */

#include <stdio.h>

char lower(char c);

int main(void) {
    char c = lower('A');
    printf("%c\n", c); // a

    c = lower('a');
    printf("%c\n", c); // a

    c = lower('H');
    printf("%c\n", c); // h

    c = lower('z');
    printf("%c\n", c); // z

    c = lower('0');
    printf("%c\n", c); // 0
}

char lower(char c) {
    return (c >= 'A' && c <= 'Z') ? c - 'A' + 'a' : c;
}
