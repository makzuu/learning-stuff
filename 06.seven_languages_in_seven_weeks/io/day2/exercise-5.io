// Write a prototype for a two-dimensional list. The dim(x, y) method should
// allocate a list of y list that are x elements long. set(x, y, value) should
// set a value, and get(x, y) should return that value.

Matrix := Object clone do(
    description := "a two-dimensional list"
    data := nil

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

)

m := Matrix
m dim(3, 2)

m set(0, 0, 1)

v := m get(0, 0)

v println
