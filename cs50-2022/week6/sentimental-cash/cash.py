# TODO

from cs50 import get_float


def main():
    quarters = 25
    dimes = 10
    nickels = 5
    pennies = 1

    owed = -1
    while owed < 0:
        owed = get_float('Change owed: ')

    owed *= 100

    q = how_many(quarters, owed)
    owed -= quarters * q
    d = how_many(dimes, owed)
    owed -= dimes * d
    n = how_many(nickels, owed)
    owed -= nickels * n
    p = how_many(pennies, owed)
    owed -= pennies * p

    print(q + d + n + p)


def how_many(x, owed):
    return int(owed / x)


if __name__ == "__main__":
    main()
