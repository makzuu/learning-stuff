.globl thefunction, factorial, exponent

.section .text
# 1st parameter(%rdi): number
# return value: number (number! or number ^ 3)
thefunction:
	testq $1, %rdi
	jz even

odd:
	# %rdi is already set
	movq $3, %rsi
	call exponent	# raise num to the power of 3
	ret		# and return

even:
	call factorial	# calculate the factorial of num
	ret		# and return

# 1st parameter(%rdi): number
# return value: number!
factorial:
	cmpq $1, %rdi
	jg recursion

	movq $1, %rax
	ret

recursion:
	pushq %rbp
	movq %rsp, %rbp
	subq $16, %rsp

	movq %rdi, -8(%rbp)

	decq %rdi
	call factorial

	mulq -8(%rbp)

	leave
	ret


# 1st parameter(%rdi): base
# 2nd parameter(%rsi): exponent
# return value: base ^ exponent
exponent:
	movq $1, %rax

	cmpq $1, %rsi
	jg mloop

	ret

mloop:
	mulq %rdi

	decq %rsi
	jnz mloop

	ret
