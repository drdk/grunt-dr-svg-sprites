/*
 * dr-grunt-svg-sprites
 * 
 *
 * Copyright (c) 2013 rasmusfl0e
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {

	var async = require("async"),
		spriteBuilder = require("./lib/svg-sprite-builder"),
		spriteElementBuilder;

	grunt.registerTask("svg-sprites", "Build SVG sprites with PNG fallbacks", function() {

		var options = this.options({
			prefix: "",
			cssSuffix: "css"
		});

		var done = this.async();

		console.log("Building SVG sprites...");

		var tasks = [];

		if (options.sprites) {

			spriteElementBuilder = require("./lib/svg-sprite-element-builder");

			tasks.push(function (callback) {
				spriteElementBuilder(options, callback);
			});

		}

		tasks.push(function (callback) {
			spriteBuilder(options, callback);
		});

		async.series(tasks, function (err) {
			if (err) {
				console.error(err);
			}
			console.log("Done.");
			done();
		});
	
	});

};
