/*openresty-jwt - a jwt implementation written explicitly for use with nginx and OpenResty*/"use strict";function _interopDefault(a){return a&&"object"==typeof a&&"default"in a?a["default"]:a}var Crypto=_interopDefault(require("crypto"));function addMinutes(a,b){const c=new Date(a);return c.setTime(c.getTime()+6e4*b),c}function addHours(a,b){const c=new Date(a);return c.setTime(c.getTime()+60*(60*b)),c}function Base64urlEncode(a){return new Buffer.from(a).toString("base64").replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function OctetFromClaims(a){const b=[];for(let c=0,d=a.length;c<d;c++){const d=a.charCodeAt(c);b.push(255&d)}return b}function Base64Claims(a){return Base64urlEncode(a)}function CreateJOSEbody(a){const b=OctetFromClaims(a),c=Base64urlEncode(b);return c}function Sign(a,b,c,d){let e="";switch(d){case"seconds":e=addMinutes(new Date,c).getTime();case"minutes":e=addMinutes(new Date,c).getTime();case"hours":e=addHours(new Date,c).getTime();}const f=Object.assign({},b,{exp:e}),g=CreateJOSEbody("{\"typ\":\"JWT\",\r\n \"alg\":\"HS256\"}"),h=CreateJOSEbody(JSON.stringify(f)),i=Crypto.createHmac("sha256",a).update(`${g}.${h}`).digest("base64");return`${g}.${h}.${i}`}function Verify(a,b){const c=b.split("."),d=Buffer.from(c[1],"base64").toString("ascii"),e=c[2],f=c[0],g=Crypto.createHmac("sha256",a).update(`${c[0]}.${c[1]}`).digest("base64"),h=Buffer.from(g,"base64"),i=Buffer.from(e,"base64"),j=Crypto.timingSafeEqual(h,i);return!!j&&d}var JWT={Sign,Verify,OctetFromClaims,Base64Claims},index={Sign:JWT.Sign,Verify:JWT.Verify};module.exports=index;
