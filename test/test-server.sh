#!/bin/bash
echo "Make sure you have a running server on port 8081\n"
npm test

TOKEN=`babel-node test/new-token.js`
echo http --body http://localhost:8081/verify?token=$TOKEN

http --body http://localhost:8081/verify?token=$TOKEN

set -- "$TOKEN"
IFS="."; declare -a Array=($*)
echo "\nHEADER "
echo "${Array[0]}" | base64 --decode
echo "\n\nMESSAGE "
echo "${Array[1]}" | base64 --decode
echo "\n\n"
