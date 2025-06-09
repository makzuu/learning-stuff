#!/usr/bin/sh

set -xe

gcc factorial.s callfactorial.s -static -g -o a.out
