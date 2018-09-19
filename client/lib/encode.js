import Crypto from "crypto";
import AddMinutes from "./add-minutes";
import AddSeconds from "./add-minutes";

function GenerateSignature(key, _opts, _seconds) {
	const seconds = _seconds || 60;
	const opts = Object.assign({}, _opts, {
		"expireAt": AddSeconds(new Date(), 1).getTime()/1000,
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

