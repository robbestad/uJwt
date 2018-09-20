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
docker push $USER/$APP:$TAG
docker push $USER/$APP:latest

