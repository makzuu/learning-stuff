#!/usr/bin/sh

set -xe

cc -g main.c largestvaluefunc.s exponentfunc.s -o a.out
