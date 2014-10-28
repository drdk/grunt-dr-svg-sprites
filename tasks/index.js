/*
 * grunt-dr-svg-sprites
 * 
 *
 * Copyright (c) 2014 drdk
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {

	var builder = require("dr-svg-sprites");

	var desc = "Build SVG sprites with PNG fallbacks";

	grunt.registerMultiTask("dr-svg-sprites", desc, task);

	grunt.registerMultiTask("svg-sprites", desc, task);
	
	function task () {

		var options = this.options({});

		if (!this.data.options || !("spriteElementPath" in this.data.options)) {
			options.spriteElementPath += "/" + this.target;
		}

		options.name = this.target;

		var done = this.async();

		console.log("Building SVG sprites...");

		builder(options, function () {
			console.log("Done.");
			done();
		});
	
	}

};