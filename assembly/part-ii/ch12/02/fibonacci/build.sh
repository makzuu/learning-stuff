#!/usr/bin/sh

set -xe

gcc callfib.s fib.s -static -g -o a.out
