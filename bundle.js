'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Crypto = _interopDefault(require('crypto'));

function addMinutes(date, units) {
	const _date = new Date(date);
	_date.setTime(_date.getTime() + units * 60000);
	return _date;
}

function GenerateSignature(key, _opts) {
	const opts = Object.assign({}, _opts, {
		"expireAt": addMinutes(new Date(), 1).getTime()/1000,
	});
	const query = Buffer.from(JSON.stringify(opts)).toString("base64");
	const sharedSecret = key.toString();
	const signature = Crypto.createHmac('sha256', sharedSecret).update(query).digest('base64');
	const header = Buffer.from(JSON.stringify({
		  "alg": "HS256",
			"typ": "JWT"
	})).toString("base64");
	return `${header}.${query}.${signature}`;
}

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

var index = {
  EncodeSignature: GenerateSignature,
  DecodeSignature
};

module.exports = index;
