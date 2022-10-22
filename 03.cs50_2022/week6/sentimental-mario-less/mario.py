# TODO

from cs50 import get_int

height = 0
while height < 1 or height > 8:
    height = get_int('Height: ')

for i in range(1, height + 1):  # i == '#' count per row
    spaces = height - i 
    for c in range(height):  # c == chars per row
        if c < spaces:
            print(' ', end='')
        else:
            print('#', end='')
    print()
