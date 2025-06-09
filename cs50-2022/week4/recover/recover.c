#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

typedef uint8_t BYTE;
const int BLOCKSIZE = 512;
 
int main(int argc, char **argv)
{
    if (argc != 2)
    {
        printf("usage:\n./recover <file name>\n");
        return 1;
    }

    FILE *f = fopen(*(argv + 1), "r");
    if (f == NULL)
    {
        printf("could not open %s\n", *(argv + 1));
        return 1;
    }

    BYTE buffer[BLOCKSIZE];
    int fcount = 0;
    FILE *img;
    while (fread(&buffer, BLOCKSIZE, 1, f))
    {
        char filename[8];

        if (*(buffer + 0) == 0xff && *(buffer + 1) == 0xd8 && *(buffer + 2) == 0xff && (*(buffer + 3) & 0xf0) == 0xe0)
        {
            if (fcount > 0)
            {
                fclose(img);
            }

            sprintf(filename, "%03d.jpg", fcount);
            fcount++;

            img = fopen(filename, "w");
            fwrite(&buffer, BLOCKSIZE, 1, img);
        }
        else if (fcount > 0)
        {
            fwrite(&buffer, BLOCKSIZE, 1, img);
        }
    }

    fclose(img);
    fclose(f);
}
