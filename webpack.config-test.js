var webpack = require('webpack');
var loaders = require('./webpack.loaders.js');

module.exports = {
	devtool: 'source-map',
	module: {
		loaders: loaders
	},
	output: {
		devtoolModuleFilenameTemplate:         '[absolute-resource-path]',
		devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
	},
	target: 'node',
    externals: [require('webpack-node-externals')({
        whitelist: []
    })]
};
