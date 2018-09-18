# JWT

### Motivation

* Provide a capability-based link using a JWT (JSON Web Token) that allows access to a given resource to a given user for a given time
* The link authenticates the user without any calls to the authentication server
* The message contains an expireAt timestamp which denies access when expired

## Algorithm when not using an external authentication service

##### Generate Message and Signature
```
client generates message
  append user info to message
  client generates signature
    signature generation appends expire time to message
    sign with HMAC SHA256 using a shared secret generateSharedKey
      return message.signature
```
The result is a message.signature that can be used in a capability based link

Example _message.signature_:
```
eyJmaWxlIjoiL2ZvbGtlbXVzaWtrLzIwMTgvMDYvMTEvYXNuZDA5MTJubnNudWM5ODIubXA0IiwiZXhwaXJlQXQiOiIyMDE4LTA5LTE1VDEwOjQ2OjUzLjMwN1oifQ==.tz8XOxhXx0WX2y+cyz38WJoRMvdv7wtcCkEG+pmiH94=
```
Example _link_:
```
/resource/eyJmaWxlIjoiL2ZvbGtlbXVzaWtrLzIwMTgvMDYvMTEvYXNuZDA5MTJubnNudWM5ODIubXA0IiwiZXhwaXJlQXQiOiIyMDE4LTA5LTE1VDEwOjQ2OjUzLjMwN1oifQ==.tz8XOxhXx0WX2y+cyz38WJoRMvdv7wtcCkEG+pmiH94=
```

##### Handling /resource/message.signature
```
server receives request
verify that signature and message matches using HMAC SHA256 and the same shared secret generateSharedKey
verify that current time is less than expire time
if valid
 redirect to file
else 
 redirect to 410 Gone
```


## Algorithm when using an external Active Directory

##### /sign
```
send the OIDC bearer token provided by the ADFS server and message to signing server
if authentication is approved
 append expire time to message
 append user info to message
 sign message with HMAC SHA256 and a secret signature
   return message and signed generateSharedKey
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

