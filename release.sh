#!/bin/bash
OTP=$1
npx standard-version
npx rollup -c
PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')
git commit -am"chore: Publish $PACKAGE_VERSION"
# git tag v$PACKAGE_VERSION 
git push --tags
npm publish --access=public --otp $OTP
