const path = require("path");
const EncodeSignature = require(path.resolve(__dirname, "client/lib/encode.js"));
const DecodeSignature = require(path.resolve(__dirname, "client/lib/decode.js"));

module.exports = {
  EncodeSignature,
  DecodeSignature
}

