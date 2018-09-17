import Crypto from "crypto";
import AddMinutes from "./add-minutes";

function GenerateSignature(key, _opts) {
	const opts = Object.assign({}, _opts, {
		"expireAt": AddMinutes(new Date(), 20),
	});
	const query = Buffer.from(JSON.stringify(opts)).toString("base64");
	const sharedSecret = key.toString();
	const signature = Crypto.createHmac('sha256', sharedSecret).update(query).digest('base64');
	return `${query}.${signature}`;

}

export default GenerateSignature;

