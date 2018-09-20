# OpenResty nginx server

Build with Dockerfile, or run with `run.sh`

### TEST

```
http http://localhost/verify\?token\=<token>
```

For easy testing, start the server with `run.sh` and
execute `npm run test-server`. This executes the test suite,
generates a new token and verifies it using [HTTPie](https://httpie.org/).

