import JWT from "../../index.js";

const {EncodeSignature, DecodeSignature} = JWT;

const key = "big-secret"
let generatedToken = "";
let opts = {};

describe('Signatures', () => {
	it('Generates a signature with an optional object', () => {
		opts = {
			"file": "/resource/2018/06/11/asnd0912nnsnuc982.mp4"
		};
		generatedToken = EncodeSignature(key, opts);
		expect(typeof generatedToken).toBe("string");
	});

})
describe('Signatures', () => {
	it('Decodes the expireAt', () => {
		const result = DecodeSignature(key, generatedToken);
		expect(typeof JSON.parse(result).expireAt).toBe("number");
	});
	it('Decodes the filename', () => {
		const result = DecodeSignature(key, generatedToken);
		expect(JSON.parse(result).file).toEqual(opts.file);
	});
})
