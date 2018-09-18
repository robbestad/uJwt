import Crypto from "crypto";
import AddMinutes from "./add-minutes";

function GenerateSignature(key, _opts) {
	const opts = Object.assign({}, _opts, {
		"expireAt": AddMinutes(new Date(), 20),
	});
	const query = Buffer.from(JSON.stringify(opts)).toString("base64");
	const sharedSecret = key.toString();
	const signature = Crypto.createHmac('sha256', sharedSecret).update(query).digest('base64');
	const header = Buffer.from(JSON.stringify({
		  "alg": "HS256",
			"typ": "JWT"
	})).toString("base64")
	return `${header}.${query}.${signature}`;
}

export default GenerateSignature;

