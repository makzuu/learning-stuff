# TODO

from cs50 import get_string


def main():
    text = get_string('Text: ')
    letters, words, sentences = count(text)

    L = letters / words * 100
    S = sentences / words * 100
    index = round(0.0588 * L - 0.296 * S - 15.8)

    if index > 15:
        print('Grade 16+')
    elif index < 1:
        print('Before Grade 1')
    else:
        print(f'Grade {index}')


def count(text):
    letters = 0
    words = 0
    sentences = 0

    prev_was_char = False
    for c in text:
        if c.isalpha():
            letters += 1
            prev_was_char = True
        if c == ' ' and prev_was_char == True:
            words += 1
            prev_was_char = False
        if c == '.' or c == '!' or c == '?':
            sentences += 1

    words += 1

    return letters, words, sentences


if __name__ == '__main__':
    main()
