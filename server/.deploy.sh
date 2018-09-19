#!/bin/sh

#
# This a deployment script used when developing and deploying this
# application. It's probably only useful for the maintainer of this repo
#
docker push $USER/$REPO:$TAG
docker push $USER/$REPO:latest

