#!/bin/sh

#
# This a deployment script used when developing and deploying this
# application. It's probably only useful for the maintainer of this repo
#

TAG=`git rev-parse --verify HEAD`
APP=jwt-server
CTX=jwt
USER=svena
REPO=nginx-jwt-server

echo -------------
echo docker build -t svena/$APP:$TAG .
docker build -t svena/$APP:$TAG .
docker tag svena/$APP:$TAG svena/$APP:latest


