# µJwt

### Motivation

* Create a micro JWT lib that does just the bare essentials in accordance with JWT spec

## Algorithm when not using an external authentication service

##### Generate Message and Signature
```
client generates message
  append user info to message
  client generates signature
    signature generation appends expire time to message
    sign header.message according to JWT spec with HMAC SHA256 using a shared secret 
      return header.message.signature
```
The result is a header.message.signature that can be used in a capability based link

Example token (_header.message.signature_) using password *big-secret*:
```
eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJmaWxlIjoiL3Jlc291cmNlLzIwMTgvMDYvMTEvYXNuZDA5MTJubnNudWM5ODIubXA0In0.-yr9RlB9gzVSV8WyKSx5gmp6sjnS9inpDBN7413jdVU=
```

## Strategies

##### Handling /resource/message.signature
```
server receives request
verify that signature and message matches using HMAC SHA256 and the same shared secret 
verify that current time is less than expire time
if valid
 redirect to file
else 
 redirect to 410 Gone
```


### Algorithm when using an external Active Directory

##### /sign
```
send the OIDC bearer token provided by the ADFS server and message to signing server
if authentication is approved
 append expire time to message
 append user info to message
 sign header.message with HMAC SHA256 and the shared key
   return token
```

##### /verify
```
send signing generateSharedKey and message
verify that signature and message matches
verify that current time is less than expire time
if valid
 redirect to file
else 
 redirect to 410 Gone
```

This implementation does not rely on a shared key. The initial 
authentication is deferred to the Active Directory used by the client.

