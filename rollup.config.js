import minify from 'rollup-plugin-babel-minify';

export default {
	input:    "index.js",
	external: ["crypto"],
	plugins:  [minify({comments:false, banner:"/*openresty-jwt - a jwt implementation written explicitly for use with nginx and OpenResty*/"})],
	output:   {
		file:   'bundle.js',
		format: "cjs"
	}
}
