#!/usr/bin/sh

set -xe

gcc -static -g allocate.s useallocate.s -o a.out
