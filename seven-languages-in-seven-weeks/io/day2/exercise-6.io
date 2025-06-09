// Bonus: Write a transpose method so that (new_matrix get(y, x)) == matrix 
// get(x, y) on the original list.

Matrix := Object clone do(
    init := method(
        self description := "a two-dimensional list"
        self data := list()
    )

    dim := method(x, y, /* x = element's size, y = elements */
        data = List clone setSize(y)
        data foreach(i, e,
            data atPut(i, List clone setSize(x))
        )
    )

    set := method(x, y, value, 
        data at(y) atPut(x, value)
    )

    get := method(x, y,
        data at(y) at(x)
    )

    transpose := method(x, y,
        new_matrix := Matrix clone
        new_matrix data = data foreach(e,
            new_matrix data append(e itemCopy)
        )

        new_matrix set(x, y, self get(y, x))
        new_matrix set(y, x, self get(x, y))

        new_matrix
    )
)

matrix := Matrix clone
matrix dim(2, 2)

matrix set(0, 0, 1)
matrix set(0, 1, 2)
matrix set(1, 0, 3)
matrix set(1, 1, 4)

x := 0; y := 1
new_matrix := matrix transpose(x, y)

writeln(new_matrix get(y, x), " == ", matrix get(x, y))

writeln(matrix)
writeln(new_matrix)
