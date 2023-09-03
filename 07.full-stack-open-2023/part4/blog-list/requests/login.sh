#!/usr/bin/bash

url=http://localhost:3001/api/login

hellas='{"username":"hellas","password":"1234"}'

curl -X POST \
	$url \
	-H 'Content-Type':'application/json' \
	-d "$hellas" \
	| jq
