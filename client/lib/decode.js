import Crypto from "crypto";

function DecodeSignature(key, queryString) {

	const sharedSecret = key;

	const _ = queryString.split(".");
	const query = Buffer.from(_[1], 'base64').toString('ascii'),
		retrievedSignature = _[2],
		retrievedHeader = _[0];

	const computedSignature = Crypto.createHmac('sha256', sharedSecret).update(_[1]).digest('base64');
	const computedSignatureBuffer = Buffer.from(computedSignature, 'base64');
	const retrievedSignatureBuffer = Buffer.from(retrievedSignature, 'base64');

	try {
		const valid = Crypto.timingSafeEqual(computedSignatureBuffer, retrievedSignatureBuffer);
		if (valid) {
			return query;
		}
	}
	catch (e) {
		return e;
	}
}

export default DecodeSignature;
