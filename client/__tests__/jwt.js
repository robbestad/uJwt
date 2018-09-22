import JWT from "../../client/lib/jwt.js";

const {OctetFromClaims, Base64Claims, CreateJWT, Sign, Verify} = JWT;
const key = "big-secret"

describe('Encode token in accordance with rfc7519', () => {
	it('Generate octet', async () => {
		const claims = '{"typ":"JWT",\r\n "alg":"HS256"}';
		const octet = await OctetFromClaims(claims);
		expect(octet.toString("utf8")).toEqual([123, 34, 116, 121, 112, 34, 58, 34, 74, 87, 84, 34, 44, 13, 10, 32, 34, 97, 108, 103, 34, 58, 34, 72, 83, 50, 53, 54, 34, 125].toString("utf8"));
	});

	it("Base64urlencode octet claims", async () => {
		const claims = '{"typ":"JWT",\r\n "alg":"HS256"}';
		const octet = OctetFromClaims(claims);
		const base64encoded = await Base64Claims(octet);
		expect(base64encoded.toString("utf8")).toEqual("eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9")
	})

	it("Base64urlencode octet claims from rfc", async () => {
		const claims = '{"iss":"joe",\r\n' +
			' "exp":1300819380,\r\n' +
			' "http://example.com/is_root":true}';
		const octet = OctetFromClaims(claims);
		const base64encoded = await Base64Claims(octet);
		expect(base64encoded).toEqual("eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ")
	})

	// it('Decodes the expireAt', async () => {
	// 	const claims = {
	// 		"file": "/resource/2018/06/11/asnd0912nnsnuc982.mp4"
	// 	};
	// 	const generatedToken = Sign(key, claims, 2, "hours");
	// 	const result = await Verify(key, generatedToken);
	// 	expect(typeof JSON.parse(result).exp).toBe("number");
	//
	// 	const generatedTokenMinutes = Sign(key, claims, 2, "minutes");
	// 	const resultMinutes = await Verify(key, generatedTokenMinutes);
	// 	expect(typeof JSON.parse(resultMinutes).exp).toBe("number");
	//
	//
	// 	const generatedTokenSeconds = Sign(key, claims, 15, "seconds");
	// 	const resultSeconds = await Verify(key, generatedTokenSeconds);
	// 	expect(typeof JSON.parse(resultSeconds).exp).toBe("number");
	//
	// });

	it('Invalid JWT', async () => {
		const claims = {
			"file": "/resource/2018/06/11/asnd0912nnsnuc982.mp4"
		};
		const generatedToken = Sign(key, claims, 2, "hours");
		const result = await Verify("different-key", generatedToken);
		expect(result).toEqual(false);
	})

	it('Decodes the filename', async () => {
		const claims = {
			"file": "/resource/2018/06/11/asnd0912nnsnuc982.mp4"
		};
		const generatedToken = Sign(key, claims, 2, "hours");
		const result = await Verify(key, generatedToken);
		expect(JSON.parse(result).file).toEqual(claims.file);
	});

})
