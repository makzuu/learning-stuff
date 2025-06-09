.globl _start

.section .text
_start:
	movq $5, %rdi
	call thefunction

	# the result should be less that 256
	movq %rax, %rdi
	movq $60, %rax
	syscall
