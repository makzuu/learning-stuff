#!/usr/bin/sh

set -ex

as main.s -o main.o

ld main.o
