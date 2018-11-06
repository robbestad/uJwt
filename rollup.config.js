import minify from 'rollup-plugin-babel-minify';
const p = require("./package.json")

export default {
	input:    "index.js",
	external: ["crypto"],
	plugins:  [minify({comments:false, banner:`/*uJwt ${p.version}*/`})],
	output:   {
		file:   'bundle.js',
		format: "cjs"
	}
}
