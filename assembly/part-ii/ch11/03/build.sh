#!/usr/bin/sh

set -xe

as -g main.s -o main.o
as -g funcs.s -o funcs.o

ld main.o funcs.o -o a.out
