import minify from 'rollup-plugin-babel-minify';

export default {
	input:    "index.js",
	external: ["crypto"],
	plugins:  [minify({comments:false, banner:"/*uJwt*/"})],
	output:   {
		file:   'bundle.js',
		format: "cjs"
	}
}
