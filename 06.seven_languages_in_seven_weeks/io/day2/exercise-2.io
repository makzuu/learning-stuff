// How would you change / to return 0 if the denominator is zero?

/ := Number getSlot("/")

Number / = method(n,
    if(n == 0) then(return 0) else(Number / = Lobby getSlot("/"))
    self / n
)

writeln("9 / 0 = ", 9 / 0)
writeln("2 / 1 = ", 2 / 1)
