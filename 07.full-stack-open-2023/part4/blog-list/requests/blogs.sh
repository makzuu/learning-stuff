#!/usr/bin/bash

url=http://localhost:3001/api/blogs
blog='{"title":"Im 17 and wrote this guide on how CPUs run programs","author":"kognise","url":"https://github.com/hackclub/putting-the-you-in-cpu","likes":"10"}'

#curl -X POST \
#    $url \
#    -H Content-Type:application/json \
#    -d  "$blog" \
#    | jq

curl -X GET \
	$url \
	| jq
