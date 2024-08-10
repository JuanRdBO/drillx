import crypto from "node:crypto";
const equihash = require("equihash")("khovratovich");

const challenge = [255, 32];

// input seed for equihash (up to 512 bits)
const input: Buffer = crypto
	.createHash("sha256")
	.update("test1234", "utf8")
	.digest();
const options = {
	n: 90,
	k: 5,
};

equihash.solve(input, options, (err: Error, proof: any) => {
	if (err) {
		return console.log("Failed to generate proof:", err);
	}

	console.log("Equihash proof:", proof);
	console.log("Valid proof? ", equihash.verify(input, proof));
});
