#!/usr/bin/bash

url=http://localhost:3001/api/blogs
blog='{"title":"Im 17 and wrote this guide on how CPUs run programs","author":"kognise","url":"https://github.com/hackclub/putting-the-you-in-cpu","likes":"10"}'
token='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1sdXVra2FpIiwiaWQiOiI2NGYzY2IwOWQzYjkyN2RlN2MyODc5YzgiLCJpYXQiOjE2OTM3NjU2MzR9.PoV7mjex0NhWsuZLGVrk8k7eK7s8gALyznvg7iaVZwM'

#curl -X POST \
#    $url \
#    -H 'Content-Type':'application/json' \
#    -d  "$blog" \
#    | jq

#curl $url \
#	-H 'Content-Type':'application/json' \
#	-H 'Authorization':"$token"\
#	-d  "$blog" \
#	| jq

#curl -i -X DELETE \
#	$url/64f524c03f25df47c78b5963 \
#	-H 'Authorization':"$token" \

curl $url | jq
