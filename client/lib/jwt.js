import Crypto from "crypto";

// JWS -> JSON Web Signature
// JWE -> JSON Web Encryption
// JOSE --> JSON Object Signing and Encryption

// 1. Create a JWT Claims Set containing the desired claims.
// -> claims

// 2. Let the Message be the octets of the UTF-8 representation of the JWT Claims Set.
// --> OctetFromClaims

// 3. Create a JOSE Header containing the desired set of Header
// Parameters. The JWT MUST conform to either the [JWS] or [JWE]
// specification. Note that whitespace is explicitly allowed in the
// representation and no canonicalization need be performed before
// encoding.
// --> Base64Claims

// 4. Depending upon whether the JWT is a JWS or JWE, there are two
// cases:
// 	* If the JWT is a JWS, create a JWS using the Message as the JWS
// Payload; all steps specified in [JWS] for creating a JWS MUST
// be followed.
// * Else, if the JWT is a JWE, create a JWE using the Message as
// the plaintext for the JWE; all steps specified in [JWE] for
// 	creating a JWE MUST be followed.

// 5. If a nested signing or encryption operation will be performed,
// 	let the Message be the JWS or JWE, and return to Step 3, using a
// "cty" (content type) value of "JWT" in the new JOSE Header
// created in that step.

// 6. Otherwise, let the resulting JWT be the JWS or JWE.

// Optional registered claims header vals
// --> iss (issuer)
// --> sub (subject)
// --> aud (audience)
// --> exp (expiration time, timestamp with or without fractions)
// --> nbf (not before) reverse expiration time
// --> iat (issued at, timestamp)
// --> jti (unique identifier. can be used to prevent the JWT from being replayed)

/**
 * @return {string}
 */
function Base64urlEncode(str) {
    return new Buffer.from(str)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

function OctetFromClaims(claims) {
    const octets = [];
    for (let i = 0, length = claims.length; i < length; i++) {
        const code = claims.charCodeAt(i);
        octets.push(code & 0xff);
    }
    return octets;
}

/**
 * @return {string}
 */
function Base64Claims(octets) {
    return Base64urlEncode(octets);
}

/**
 * @return {string}
 */
function CreateJOSEbody(input) {
    const octets = OctetFromClaims(input);
    return Base64urlEncode(octets);
}

/**
 * @return {string}
 */
function Sign(alg, key, claims, base64Encoded = false) {
    function escapeBase64Url(secret) {
        return secret.replace(/\+/g, '-').replace(/\//g, '_');
    }


    let algo = "";
    switch (alg) {
        case "sha256": {
            algo = "HS256";
            break;
        }
        default: {
            algo = "HS256";
            break;
        }
    }

    let secret = key
    if(base64Encoded){
        secret = Buffer.from(key, 'base64');
    }

    const header = `{"typ":"JWT",\r\n "alg":"${algo}"}`;

    const joseHeader = CreateJOSEbody(header);
    const joseMessage = CreateJOSEbody(JSON.stringify(claims));
    let signature = Crypto.createHmac('sha256', secret).update(`${joseHeader}.${joseMessage}`).digest('base64');

    return `${joseHeader}.${joseMessage}.${escapeBase64Url(signature)}`;
}

/**
 * @return {string}
 */
function Verify(key, token, base64Encoded=false) {

    const _ = token.split(".");
    const message = Buffer.from(_[1], 'base64').toString('ascii'),
        retrievedSignature = _[2],
        retrievedHeader = _[0];

    let secret = key
    if(base64Encoded){
        secret = Buffer.from(key, 'base64');
    }

    const computedSignature = Crypto.createHmac('sha256', secret).update(`${_[0]}.${_[1]}`).digest('base64');
    const computedSignatureBuffer = Buffer.from(computedSignature, 'base64');
    const retrievedSignatureBuffer = Buffer.from(retrievedSignature, 'base64');

    const valid = Crypto.timingSafeEqual(computedSignatureBuffer, retrievedSignatureBuffer);
    if (valid) {
        return message;
    } else {
        throw new Error("Could not verify signature");
    }
}

export default {
    Sign,
    Verify,
    OctetFromClaims,
    Base64Claims
}


