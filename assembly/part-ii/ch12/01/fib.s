.globl fib

.section .text
fib:
	cmpq $0, %rdi
	je fib_0

	cmpq $1, %rdi
	je fib_1

	jmp fib_n

fib_0:
	movq $0, %rax
	ret

fib_1:
	movq $1, %rax
	ret
	
.equ N, -8
.equ RESULT, -16
fib_n:
	pushq %rbp
	movq %rsp, %rbp
	subq $16, %rsp

	movq %rdi, N(%rbp)
	
	decq N(%rbp)
	movq N(%rbp), %rdi
	call fib

	movq %rax, RESULT(%rbp)

	decq N(%rbp)
	movq N(%rbp), %rdi
	call fib

	addq RESULT(%rbp), %rax

	leave
	ret
