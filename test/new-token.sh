#!/bin/bash
npm test client/__tests__/encode.js

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
