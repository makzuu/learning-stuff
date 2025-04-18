Go through some of the code written for previous chapters and make use of these
new directives

1. Convert ascii directives to .string.

2. Add .type annotations to symbols marked as .globl.

3. Replace .quad directives with .8byte.

4. Replace .quad directives where the initial value isn't used with a .skip directive
or an .lcoom directive. Also, move the data into the .bss section.

5. Look for values which are not modified and move then to the .rodata section.
