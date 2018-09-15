const Crypto = require('crypto');
const AddMinutes = require('./add-minutes');

function GenerateSignature(key, _opts) {
	const opts = {
		..._opts,
		"expireAt": AddMinutes(new Date(), 20)
	}
	const query = Buffer.from(JSON.stringify(opts)).toString("base64");
	const sharedSecret = key.toString();
	const signature = Crypto.createHmac('sha256', sharedSecret).update(query).digest('base64');
	return `${query}.${signature}`;

}

module.exports = GenerateSignature;

