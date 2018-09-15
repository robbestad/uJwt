const EncodeSignature = require('../lib/encode.js');
const DecodeSignature = require('../lib/decode.js');

const key="big-secret"
let generatedToken = "";
let opts = {};

describe('Signatures', () => {
	it('Generates a signature with an optional object', () => {
		opts = {
			"file": "/resource/2018/06/11/asnd0912nnsnuc982.mp4"
		};
		generatedToken = EncodeSignature(key, opts);
		expect(typeof generatedToken).toBe("string");
		// console.log(generatedToken)
	});

})
describe('Signatures', () => {
	it('Decodes a queryString', () => {
		const result = DecodeSignature(key, generatedToken);
		expect(typeof JSON.parse(result).expireAt).toBe("string");
		expect(JSON.parse(result).file).toBe(opts.file);
	});
})
