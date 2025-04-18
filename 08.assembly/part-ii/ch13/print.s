.globl _start
.type _start, @function

.section .rodata
somestring:
	.string "some text "
somestring_end:
.equ somestring_len, (somestring_end - somestring) - 1 # <- null character :3

somenumber:
	.8byte 32

.section .bss
	.lcomm numberastext, 3

.section .text
_start:
	movq $1, %rax
	movq $1, %rdi
	movq $somestring, %rsi
	movq $somestring_len, %rdx
	syscall

	movq somenumber, %rdi
	call print_num

	movq $0, %rdi
	movq $60, %rax
	syscall

.equ dividend, -8
.equ divisor, -16
print_num:
	pushq %rbp
	movq %rsp, %rbp
	subq $16, %rsp

	pushq %rbx

	leaq numberastext, %rbx
	
	movq %rdi, dividend(%rbp)
	movq $10, divisor(%rbp)

lloop:
	cmpq $0, dividend(%rbp)
	je print_done

	movq dividend(%rbp), %rax
	xorq %rdx, %rdx
	divq divisor(%rbp)

	movq %rax, dividend(%rbp)

	add $'0', %rdx
	movb %dl, (%rbx)

	incq %rbx
	jmp lloop

print_done:
	movq $'\n', (%rbx)

	movq $1, %rax
	movq $1, %rdi
	leaq numberastext, %rsi
	movq $3, %rdx
	syscall

	popq %rbx

	leave
	ret
