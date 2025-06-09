#!/usr/bin/sh

set -xe

as main.s -o main.o

ld main.o
