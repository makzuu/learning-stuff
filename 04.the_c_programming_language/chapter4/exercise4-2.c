/* Extend atof to handle scientific notation of the form 123.45e-6 */

#include <ctype.h>
#include <stdio.h>
#include <math.h>

/* atof: convert string s to double */
double atof(char s[]) {
    double val, power, exp, pow(double, double);
    int i, sign;

    for (i = 0; isspace(s[i]); i++) /* skip white space */
        ;
    sign = (s[i] == '-') ? -1 : 1;
    if (s[i] == '+' || s[i] == '-')
        i++;
    for (val = 0.0; isdigit(s[i]); i++)
        val = 10.0 * val + (s[i] - '0');
    if (s[i] == '.')
        i++;
    for (power = 1.0; isdigit(s[i]); i++) {
        val = 10.0 * val + (s[i] - '0');
        power *= 10.0;
    }

    if (s[i] == 'e')
        i++;
    if (s[i] == '-')
        i++;
    for (exp = 0.0; isdigit(s[i]); i++) {
        exp = exp * 10.0 + (s[i] - '0');
    }
    exp = pow(10, exp);

    return sign * val / power * exp;
}

int main(void) {
    char *s = ".3e-3";
    double atof(char *);

    printf("%.2f\n", atof(s));

    return 0;
}
