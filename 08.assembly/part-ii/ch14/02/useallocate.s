.globl main

.section .rodata
prompt:
	.asciz "how many bytes would you like to allocate: "
scanformat:
	.asciz "%d"

outputformat:
	.asciz "address: %p\nstring: %s\n"

err_01text:
	.asciz "<bytes> most be greater than 0\n"

.section .bss
.lcomm num_requested_bytes, 8

.section .text
.equ ALLOCATED_MEM_ADDR, -8
main:
	# create stack frame
	pushq %rbp
	movq %rsp, %rbp
	subq $16, %rsp

mainloop:
	# print prompt
	movq stdout, %rdi
	movq $prompt, %rsi
	movq $0, %rax
	call fprintf

	# scan
	movq stdin, %rdi
	movq $scanformat, %rsi
	leaq num_requested_bytes, %rdx
	movq $0, %rax
	call fscanf

	# allocated memory
	incq num_requested_bytes

	movq num_requested_bytes, %rdi
	call allocate

	movq %rax, ALLOCATED_MEM_ADDR(%rbp)

	# fill memory with 'a's
	movq num_requested_bytes, %rcx
	cmpq $0, %rcx
	jle err_01

	decq %rcx

	movq ALLOCATED_MEM_ADDR(%rbp), %rdi
	movq $'a', %rsi
	movq %rcx, %rdx
	call memset

	# put a \n and a nul character at the end
	movq ALLOCATED_MEM_ADDR(%rbp), %rax
	movq num_requested_bytes, %rcx
	decq %rcx
	addq %rcx, %rax

	movb $0, (%rax)

	# print string
	movq stdout, %rdi
	movq $outputformat, %rsi
	movq ALLOCATED_MEM_ADDR(%rbp), %rdx
	movq ALLOCATED_MEM_ADDR(%rbp), %rcx
	movq $0, %rax
	call fprintf

	# deallocate
	movq ALLOCATED_MEM_ADDR(%rbp), %rdi
	call deallocate

	jmp mainloop

	leave
	movq $0, %rax
	ret

err_01:
	movq stdout, %rdi
	movq $err_01text, %rsi
	movq $0, %rax
	call fprintf

	leave
	movq $1, %rax
	ret
