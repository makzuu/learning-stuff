// A Fibonacci sequence starts with two 1s. Each subsequent number is the sum
// of the two numbers that came before: 1, 1, 2, 3, 5, 8, 13, 21, and so on.
// Write a program to find the nth Fibonacci number. fib(1) is 1, and fib(4)
// is 3. As a bonus, solve the problem with recursion and with loops.

fib := method(n,
    if(n < 3) then(return 1) else(return fib(n - 1) + fib(n - 2))
)

writeln("fib(1): ", fib(1))
writeln("fib(4): ", fib(4))

fib2 := method(n,
    if(n < 3) then(return 1)
    a := 1; b := 1; r := 0
    while(n - 2 > 0,
        r = a + b
        a = b
        b = r
        n = n - 1
    )
    r
)

writeln("fib2(1): ", fib2(1))
writeln("fib2(4): ", fib2(4))
