.globl factorial

# f(n) = n * f(n - 1)

.equ LOCAL_NUM, -8

# %rdi >= 1
factorial:
    pushq %rbp
    movq %rsp, %rbp
    subq $16, %rsp

    cmpq $1, %rdi
    jne continue

    movq $1, %rax				# |

    leave					# |
    ret						# | return 1 if %rdi is 1

continue:
    movq %rdi, LOCAL_NUM(%rbp)

    decq %rdi					# |
    call factorial				# | call factorial(n - 1)

						# | multiply n by the result of
    mulq LOCAL_NUM(%rbp)			# | factorial(n - 1)
    
    leave
    ret
