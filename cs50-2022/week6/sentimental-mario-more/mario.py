# TODO

from cs50 import get_int

height = 0
while height < 1 or height > 8:
    height = get_int('Height: ')

for i in range(1, height + 1):
    spaces = height - i
    print(' ' * spaces, end='')
    print('#' * i, end='')
    print(' ' * 2, end='')
    print('#' * i, end='')
    print()
