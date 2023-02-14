// Write a program to add up all of the numbers in a two-dimensional array.

numbers := List clone append(1, list(1, 2, 3), 10, list(12, 32, 3), "hello")

numbers reduce(a, e, 
    if(e type == "Number", a + e,
        if(e type == "List", a + e sum, a)
    )
) println
