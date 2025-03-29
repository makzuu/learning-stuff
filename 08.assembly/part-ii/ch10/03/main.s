# Write a program that takes a number stored in memory and determines if that number
# is odd or even. Rather than using the exit status to communicate this information,
# have the program choose between two different strings to write to standard output.

.globl _start

.section .data
number:
	.quad 232

evenstr:
	.ascii "number is even\n"
evenstr_end:

oddstr:
	.ascii "number is odd\n"
oddstr_end:

.equ evenstr_len, evenstr_end - evenstr
.equ oddstr_len, oddstr_end - oddstr

.section .text
_start:
	movq number, %rax
	andq $0x1, %rax
	jz even

odd:
	movq $oddstr, %rsi
	movq $oddstr_len, %rdx
	jmp print

even:
	movq $evenstr, %rsi
	movq $evenstr_len, %rdx

print:
	movq $1, %rax		# write syscall
	movq $1, %rdi		# std output
	syscall

exit:
	movq $60, %rax
	movq $0, %rdi
	syscall
