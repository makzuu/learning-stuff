.globl main

.section .data
inputfilename:
	.ascii "inputfile.txt\0"
inputmode:
	.ascii "r\0"
outputfilename:
	.ascii "outputfile.txt\0"
outputmode:
	.ascii "w\0"
scanformat:
	.ascii "%d\0"
outputformat:
	.ascii "%d\n\0"


.section .text
.equ INPUTFILE_P, -8
.equ OUTPUTFILE_P, -16
.equ NUM, -24
main:
	# create stack frame
	pushq %rbp
	movq %rsp, %rbp
	subq $32, %rsp

	# open input file
	movq $inputfilename, %rdi
	movq $inputmode, %rsi
	call fopen

	movq %rax, INPUTFILE_P(%rbp)

	# open output file
	movq $outputfilename, %rdi
	movq $outputmode, %rsi
	call fopen

	movq %rax, OUTPUTFILE_P(%rbp)

	# read from input file
	movq INPUTFILE_P(%rbp), %rdi
	movq $scanformat, %rsi
	leaq NUM(%rbp), %rdx
	movq $0, %rax
	call fscanf

	# get fib(num)
	movq NUM(%rbp), %rdi
	call fib

	# write result to output file
	movq OUTPUTFILE_P(%rbp), %rdi
	movq $outputformat, %rsi
	movq %rax, %rdx
	movq $0, %rax
	call fprintf

	# close input file
	movq INPUTFILE_P(%rbp), %rdi
	call fclose

	# close output file
	movq OUTPUTFILE_P(%rbp), %rdi
	call fclose

	movq $0, %rax
	leave
	ret
