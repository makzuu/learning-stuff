#!/usr/bin/bash

url=http://localhost:3001/api/users

hellas='{"username":"hellas","password":"1234","name":"Arto Hellas"}'
mluukkai='{"username":"mluukkai","password":"1234","name":"Matti Luukkainen"}'

#curl -X POST \
#    $url \
#    -H 'Content-Type':'application/json' \
#    -d "$mluukkai" \
#    | jq


curl -X GET \
    $url \
    | jq
