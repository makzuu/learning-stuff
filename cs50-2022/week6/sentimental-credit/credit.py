# TODO

from cs50 import get_string


def main():
    number = get_string('Number: ')
    valid = checksum(number)
    card_name = name(number)

    if valid:
        print(card_name)
    else:
        print('INVALID')


def checksum(number):
    start = len(number) - 1
    sum = 0
    second = False
    for i in range(start, -1, -1):
        if second:
            p = int(number[i]) * 2
            if (p > 9):
                a = p % 10
                b = int(p / 10)
                p = a + b
            sum += p
            second = False
        else:
            sum += int(number[i])
            second = True

    return sum % 10 == 0


def name(number):
    card_name = 'INVALID'
    
    start = int(number[:2])
    l = len(number)
    if l == 15 and (start == 34 or start == 37):
        card_name = 'AMEX'

    if l == 16 and (start == 51 or start == 52 or start == 53 or start == 54 or start == 55):
        card_name = 'MASTERCARD'

    start = int(number[:1])
    if (l == 13 or l == 16) and start == 4:
        card_name = 'VISA'

    return card_name


if __name__ == "__main__":
    main()
