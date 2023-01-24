/* Write a function escape(s, t) that converts characters like newline and tab
 * into visible escape sequences like \n and \t as it copies the string t to s.
 * Use a switch. Write a function for the other direction as well, converting
 * escape sequences into the real characters.
 */

#include <stdio.h>
#include <string.h>

void escape(char *t, char *s);
void reverse(char *t, char *s);

int main(void) {
    /* escape block */
    {
        char *t = "hola\tmundo\n\\(^.^)\\";
        printf("%s\n", t);

        char s[100];
        escape(t, s);

        printf("%s\n", s);
    }

    printf("---\n");

    /* reverse block */
    {
        char *t = "hola\\tmundo\\n\\(^.^)\\";
        printf("%s\n", t);

        char s[100];
        reverse(t, s);

        printf("%s\n", s);
    }

    return 0;
}

void escape(char *t, char *s) {
    int i, j;

    for (i = j = 0; t[i] != '\0'; i++) {
        switch (t[i]) {
            case '\t':
                s[j++] = '\\';
                s[j++] = 't';
                break;
            case '\n':
                s[j++] = '\\';
                s[j++] = 'n';
                break;
            default:
                s[j++] = t[i];
                break;
        }
    }
    s[j] = '\0';
}

void reverse(char *t, char *s) {
    int i, j;

    for (i = j = 0; t[i] != '\0'; i++)
        switch (t[i]) {
            case '\\':
                switch (t[i + 1]) {
                    case 't':
                        s[j++] = '\t';
                        i++;
                        break;
                    case 'n':
                        s[j++] = '\n';
                        i++;
                        break;
                    default:
                        s[j++] = t[i];
                        break;
                }
                break;
            default:
                s[j++] = t[i];
                break;
        }

    s[j] = '\0';
}
