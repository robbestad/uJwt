const Crypto = require('crypto');

function DecodeSignature(key,queryString) {

	const sharedSecret = key;

// Get signature
	const _ = queryString.split(".");
	const query = Buffer.from(_[0], 'base64').toString('ascii'),
		retrievedSignature = _[1];

// Recalculate signature
	const computedSignature = Crypto.createHmac('sha256', sharedSecret).update(_[0]).digest('base64');

// Compare signatures
	const computedSignatureBuffer = Buffer.from(computedSignature, 'base64');
	const retrievedSignatureBuffer = Buffer.from(retrievedSignature, 'base64');

// NOTE: might want to check length of buffers
	try {
		const valid = Crypto.timingSafeEqual(computedSignatureBuffer, retrievedSignatureBuffer);
		if (valid) {
			return query;
		}
	}
	catch (e) {
		console.log(e);
	}
}
module.exports=DecodeSignature;
