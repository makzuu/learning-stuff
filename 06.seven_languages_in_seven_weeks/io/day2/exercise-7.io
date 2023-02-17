// Write the matrix to a file, and read a matrix form a file.

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

    readFromFile := method(fName,
        f := File with(fName)
        f openForReading
        lines := f readLines
        f close

        self dim(lines at(0) split(" ") size, lines size)

        for (y, 0, lines size-1,
            line := lines at(y) split(" ")
            for (x, 0, line size-1,
                n := line at(x)
                self set(x, y, n asNumber)
            )
        )
    )

    writeToFile := method(fName,
        f := File with(fName)
        f openForUpdating

        self data foreach(i, e,
            e foreach(j, el,
                f write(el asString .. " ")
            )
            f write("\n")
        )

        f close
    )
)

matrixIn := Matrix clone
matrixIn readFromFile("matrix_in.txt")

matrixOut := Matrix clone

matrixOut dim(2, 2)

matrixOut set(0, 0, 1)
matrixOut set(0, 1, 2)
matrixOut set(1, 0, 3)
matrixOut set(1, 1, 4)

matrixOut writeToFile("matrix_out.txt")

matrixIn data println
matrixOut data println
