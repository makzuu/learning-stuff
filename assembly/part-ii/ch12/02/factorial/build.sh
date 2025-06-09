#!/usr/bin/sh

set -xe

gcc callfactorial.s factorial.s -static -g
