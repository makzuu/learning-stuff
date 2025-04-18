.globl factorial
.type factorial, @function

.section .text
factorial:
	cmpq $1, %rdi
	jg recursion

	movq $1, %rax
	ret

.equ LOCAL_NUM, -8
recursion:
	pushq %rbp
	movq %rsp, %rbp
	subq $16, %rsp

	movq %rdi, LOCAL_NUM(%rbp)

	decq %rdi
	call factorial

	mulq LOCAL_NUM(%rbp)

	leave
	ret
