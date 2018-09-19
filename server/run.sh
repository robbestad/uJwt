#!/bin/bash
docker run --rm \
    -it \
    --mount type=bind,source=`pwd`/folkemusikk,target=/folkemusikk \
    -v `pwd`/nginx.conf:/nginx.conf \
    -p 8081:8081 \
    -p 8443:443 \
    svena/jwt-server:latest

