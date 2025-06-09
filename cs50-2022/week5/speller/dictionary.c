// Implements a dictionary's functionality

#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>

#include "dictionary.h"

// Represents a node in a hash table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
}
node;

// TODO: Choose number of buckets in hash table
const unsigned int N = 26;

// Hash table
node *table[N];

// Number of words in dictionary
unsigned int wcount = 0;

// Returns true if word is in dictionary, else false
bool check(const char *word)
{
    // hash word to obtain a hash value
    unsigned int hashvalue = hash(word);
    // access linked list at that index in the hash table
    // travese linked list, looking for the word (strcasecmp)
    for (node *cursor = table[hashvalue]; cursor != NULL; cursor = cursor->next)
        if (strcasecmp(cursor->word, word) == 0) 
        {
            return true;
        }

    return false;
}

// Hashes word to a number
unsigned int hash(const char *word)
{
    unsigned int hashvalue = 0;
    int len = strlen(word);
    for (int i = 0; i < len; i++)
    {
        hashvalue += tolower(word[i]);
    }
    hashvalue *= len;

    return hashvalue % N;
}

// Loads dictionary into memory, returning true if successful, else false
bool load(const char *dictionary)
{
    // open dictionary file
    FILE *file = fopen(dictionary, "r");
    if (file == NULL) 
    {
        return false;
    }
    // read strings from file one at a time
    for (char word[LENGTH + 1]; fscanf(file, "%s", word) != EOF;)
    {
        // create a new node for each word
        node *n = malloc(sizeof(node));
        if (n == NULL) 
        {
            return false;
        }
        strcpy(n->word, word);
        // hash word to obtain a hash value
        unsigned int hashvalue = hash(word);
        // insert node into hash table at that location
        n->next = table[hashvalue];
        table[hashvalue] = n;

        wcount++;
    }
    fclose(file);

    return true;
}

// Returns number of words in dictionary if loaded, else 0 if not yet loaded
unsigned int size(void)
{
    return wcount;
}

// Unloads dictionary from memory, returning true if successful, else false
bool unload(void)
{
    for (int i = 0; i < N; i++)
    {
        node *cursor = table[i], *tmp = table[i];
        for (; cursor != NULL; tmp = cursor)
        {
            cursor = cursor->next;
            free(tmp);
        }
    }
    return true;
}
