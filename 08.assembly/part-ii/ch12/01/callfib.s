.globl main

.section .data
formatstring:
	.ascii "Enter a number: \0"
scanformat:
	.ascii "%d\0"
resultformat:
	.ascii "fib(%d) = %d\n\0"

.section .text
.equ NUMBER, -8
main:
	pushq %rbp
	movq %rsp, %rbp
	subq $16, %rsp

	movq stdout, %rdi
	movq $formatstring, %rsi
	movq $0, %rax
	call fprintf

	movq stdin, %rdi
	movq $scanformat, %rsi
	leaq NUMBER(%rbp), %rdx
	movq $0, %rax
	call fscanf

	movq NUMBER(%rbp), %rdi
	call fib

	movq stdout, %rdi
	movq $resultformat, %rsi
	movq NUMBER(%rbp), %rdx
	movq %rax, %rcx
	movq $0, %rax
	call fprintf

	movq $0, %rax
	leave
	ret
