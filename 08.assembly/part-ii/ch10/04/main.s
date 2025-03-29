# Write a program that loops ten times and alternates between printing two different
# strings each time

.globl _start

.section .data
str1:
	.ascii "fizz\n"
str1_end:

str2:
	.ascii "buzz\n"
str2_end:

.equ str1_len, str1_end - str1
.equ str2_len, str2_end - str2

.section .text
_start:
	movq $10, %rbx		# counter

mainloop:
print:
	movq $1, %rax
	movq $1, %rdi

	movq %rbx, %rcx
	# if %rcx is even jmp to fizz
	andq $0x1, %rcx
	jz fizz

buzz: # sets "buzz" as the string to be printed
	movq $str2, %rsi
	movq $str1_len, %rdx
	jmp syscall

fizz: # sets "fizz" as the string to be printed
	movq $str1, %rsi
	movq $str1_len, %rdx

syscall:
	syscall

loopcontrol:
	decq %rbx
	jnz mainloop

exit:
	movq $60, %rax
	movq $0, %rdi
	syscall
