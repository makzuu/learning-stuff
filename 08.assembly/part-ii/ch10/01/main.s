# Write a program that prints out two different strings one right after ther other.

.globl _start

.section .data
mystring:
	.ascii "hello there!\n"
mystring_end:

myotherstring:
	.ascii "bye\n"
myotherstring_end:

.equ mystring_length, mystring_end - mystring
.equ myotherstring_length, myotherstring_end - myotherstring

.section .text
_start:
	movq $1, %rax			# syscall number
	movq $1, %rdi			# fd
	movq $mystring, %rsi		# string address
	movq $mystring_length, %rdx	# string length
	syscall

	movq $1, %rax
	movq $1, %rdi
	movq $myotherstring, %rsi
	movq $myotherstring_length, %rdx
	syscall

exit:
	movq $60, %rax
	movq $0, %rdi
	syscall
