const {Entropy} = require("entropy-string");
const entropy = new Entropy({charset: 16});

const generateSharedKey = entropy.string();
module.exports = generateSharedKey;
