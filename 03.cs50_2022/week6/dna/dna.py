import csv
import sys


def main():

    # TODO: Check for command-line usage
    if len(sys.argv) != 3:
        print("Error: incorrect number of command-line arguments")
        exit(1)

    # TODO: Read database file into a variable
    filename = sys.argv[1]
    database = []
    with open(filename) as f:
        reader = csv.DictReader(f)
        for r in reader:
            database.append(r)

    # TODO: Read DNA sequence file into a variable
    filename = sys.argv[2]
    sequence = ''
    with open(filename) as f:
        sequence = f.read()

    # TODO: Find longest match of each STR in DNA sequence
    filename = sys.argv[1]
    line = ''
    with open(filename) as f:
        line = f.readline()
    strs = []
    tmp = ''
    for c in line[5:]:
        if c.isalpha():
            tmp += c
        if c == ',':
            strs.append([tmp, 0])
            tmp = ''
    strs.append([tmp, 0])

    for s in strs:
        str_name = s[0]
        s[1] = longest_match(sequence, str_name)

    # TODO: Check database for matching profiles
    result = 'No match'
    for r in database:
        found = 0
        for s in strs:
            str_name = s[0]
            database_str = int(r[str_name])
            str_count = s[1]
            if database_str == str_count:
                found += 1
        if found == len(strs):
            result = r['name']
            break
    print(result)

    return


def longest_match(sequence, subsequence):
    """Returns length of longest run of subsequence in sequence."""

    # Initialize variables
    longest_run = 0
    subsequence_length = len(subsequence)
    sequence_length = len(sequence)

    # Check each character in sequence for most consecutive runs of subsequence
    for i in range(sequence_length):

        # Initialize count of consecutive runs
        count = 0

        # Check for a subsequence match in a "substring" (a subset of characters) within sequence
        # If a match, move substring to next potential match in sequence
        # Continue moving substring and checking for matches until out of consecutive matches
        while True:

            # Adjust substring start and end
            start = i + count * subsequence_length
            end = start + subsequence_length

            # If there is a match in the substring
            if sequence[start:end] == subsequence:
                count += 1
            
            # If there is no match in the substring
            else:
                break
        
        # Update most consecutive matches found
        longest_run = max(longest_run, count)

    # After checking for runs at each character in seqeuence, return longest run found
    return longest_run


main()
