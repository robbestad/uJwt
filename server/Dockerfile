FROM svena/nginx-node

COPY nginx.conf /nginx.conf
RUN mkdir /lua
COPY json.lua /lua/json.lua

# Cleanup
RUN rm -rf /var/cache/apk/*

# Export port
EXPOSE 80 443

ENTRYPOINT ["/usr/local/openresty/bin/openresty", "-g", "daemon off;", "-c", "/nginx.conf"]

