#!/usr/bin/sh

set -xe

gcc callfactorial.s factorial.s -static -g -o callfactorial

gcc callfib.s fib.s -static -g -o callfib
