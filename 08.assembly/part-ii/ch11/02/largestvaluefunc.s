.globl largest

.section .text
# find the largest value in an array

# parameters
# %rdi: pointer to the begining of the array
# %rsi: number of elements

# return value
# index of the largest value (%rax)
largest:
	movq $-1, %rax
	cmpq $0, %rsi
	je done

	movq $0, %rcx				# index
	movq $0, %rax				# index of the largest value so far
	
mainloop:
	movq (%rdi, %rcx, 8), %rbx
	cmpq (%rdi, %rax, 8), %rbx
	jna loopcontrol

	movq %rcx, %rax

loopcontrol:
	incq %rcx
	decq %rsi
	jnz mainloop

done:
	ret
