.globl main

.section .data
formatstring:
	.ascii "Enter a number: \0"

scanformat:
	.ascii "%d\0"

resultformat:
	.ascii "%d! = %d\n\0"
formatstring2:
	.ascii "Enter (y) to keep going: \0"
scanformat2:
	.ascii " %c\0" # the ' ' before %c consumes all the white space left in the buffer

.section .text
.equ NUMBER, -8
.equ ANSWER, -16
main:
	# create stack frame
	pushq %rbp
	movq %rsp, %rbp
	subq $16, %rsp

mainloop:

	# print prompt
	movq stdout, %rdi
	movq $formatstring, %rsi
	movq $0, %rax
	call fprintf

	# get number
	movq stdin, %rdi
	movq $scanformat, %rsi
	leaq NUMBER(%rbp), %rdx
	movq $0, %rax
	call fscanf

	# call number factorial
	movq NUMBER(%rbp), %rdi
	call factorial

	# output result
	movq stdout, %rdi
	movq $resultformat, %rsi
	movq NUMBER(%rbp), %rdx
	movq %rax, %rcx
	movq $0, %rax
	call fprintf

	# ask to keep going
	movq stdout, %rdi
	movq $formatstring2, %rsi
	movq $0, %rax
	call fprintf

	movq stdin, %rdi
	movq $scanformat2, %rsi
	leaq ANSWER(%rbp), %rdx
	movq $0, %rax
	call fscanf

	cmpb $'y', ANSWER(%rbp)
	je mainloop

	# delete stack frame
	leave

	# exit
	movq $0, %rax
	ret
