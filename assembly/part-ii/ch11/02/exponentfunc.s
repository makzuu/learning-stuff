.globl exponent

.section .text

# paramaters
# %rdi: base
# %rsi: exponent
exponent:
	movq $1, %rax

mainloop:
	mulq %rdi

loopcontrol:
	decq %rsi
	jnz mainloop

done:
	ret
