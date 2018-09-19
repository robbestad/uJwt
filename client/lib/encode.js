import Crypto from "crypto";
import AddMinutes from "./add-minutes";
import AddSeconds from "./add-minutes";
import AddHours from "./add-hours";

function GenerateSignature(key, _opts, units, unit) {
	let expireAt="";
	switch(unit){
		case "seconds": {
			expireAt = AddSeconds(new Date(), units).getTime()
		}
		case "minutes": {
			expireAt = AddMinutes(new Date(), units).getTime()
		}
		case "hours": {
			expireAt = AddHours(new Date(), units).getTime()
		}
	}
	const opts = Object.assign({}, _opts, {
		"expireAt": expireAt,
	});
	const query = Buffer.from(JSON.stringify(opts)).toString("base64");
	const sharedSecret = key.toString();
	const header = Buffer.from(JSON.stringify({
		"alg": "HS256",
		"typ": "JWT"
	})).toString("base64")
	const signature = Crypto.createHmac('sha256', sharedSecret).update(`${header}${query}`).digest('base64');
	return `${header}.${query}.${signature}`;
}

export default GenerateSignature;

