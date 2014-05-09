/*
 * dr-grunt-svg-sprites
 * 
 *
 * Copyright (c) 2014 drdk
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {

	var builder = require("dr-svg-sprites");

	grunt.registerMultiTask("svg-sprites", "Build SVG sprites with PNG fallbacks", function() {

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
	
	});

};