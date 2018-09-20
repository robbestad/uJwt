#!/bin/bash
docker run --rm \
    -it \
    -v `pwd`/nginx.conf:/nginx.conf \
    -p 8081:8081 \
    svena/jwt-server:latest

