// Add a slot called myAverage to a list that computes the average of all the 
// numbers in a list. What happens if there are no numbers in a list?
// (Bonus: Raise an Io exception if any item in the list is not a number.)

l := list(1, 3, 6, 5, list(1, 2, 3), "hello")
// l := list(1, 3, 6, 5)
// l := list()

l myAverage := method(
    if (self size == 0) then(return 0)
    sum := 0
    self foreach(e,
        if(e type == "Number") then(sum = sum + e) else(
                error := "argument 0 to method myAverage must be a Number, not a '" .. e type .. "'"
                Exception raise(error)
            )
    )
    avg := sum / self size
)

l myAverage println
