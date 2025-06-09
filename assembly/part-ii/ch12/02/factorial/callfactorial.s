.globl main

.section .data
inputfile:
	.ascii "inputfile.txt\0"
inputfilemode:
	.ascii "r\0"
outputfile:
	.ascii "outputfile.txt\0"
outputfilemode:
	.ascii "w\0"
scanformat:
	.ascii "%d\0"
stringformat:
	.ascii "%d\n\0"

.section .text
.equ INPUT_FILE_P, -8
.equ N, -16
.equ OUTPUT_FILE_P, -24
main:
	# stack frame
	pushq %rbp
	movq %rsp, %rbp
	subq $32, %rsp

	# open input file	
	movq $inputfile, %rdi
	movq $inputfilemode, %rsi
	call fopen

	# TODO: handle fopen errors

	# save input FILE *
	movq %rax, INPUT_FILE_P(%rbp)

	# open output file
	movq $outputfile, %rdi
	movq $outputfilemode, %rsi
	call fopen

	# TODO: handle fopen errors

	# save output FILE *
	movq %rax, OUTPUT_FILE_P(%rbp)

	# read value from file
	movq INPUT_FILE_P(%rbp), %rdi
	movq $scanformat, %rsi
	leaq N(%rbp), %rdx
	movq $0, %rax
	call fscanf

	# TODO: handle fscanf errors

	# calc n factorial
	movl -16(%rbp), %edi
	call factorial

	# save result to output file
	movq OUTPUT_FILE_P(%rbp), %rdi
	movq $stringformat, %rsi
	movq %rax, %rdx
	movq $0, %rax
	call fprintf

	# close files
	movq INPUT_FILE_P(%rbp), %rdi
	call fclose

	movq OUTPUT_FILE_P(%rbp), %rdi
	call fclose

	# exit
	movq $0, %rax
	leave
	ret
