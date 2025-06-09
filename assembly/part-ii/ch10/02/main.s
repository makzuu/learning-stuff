# Write a program that prints out the same string ten times in a loop.

.globl _start

.section .data
mystring:
	.ascii "hola\n"
mystring_end:

.equ mystring_len, mystring_end - mystring

.section .text
_start:
	movq $10, %rbx

mainloop:
	movq $1, %rax

	movq $1, %rdi
	movq $mystring, %rsi
	movq $mystring_len, %rdx
	syscall

loopcontrol:
	decq %rbx
	cmpq $0, %rbx
	jne mainloop

exit:
	movq $60, %rax
	movq $0, %rdi
	syscall
