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
		spriteBuilder = require("dr-svg-sprites").builder,
		spriteElementComposer;

	grunt.registerTask("svg-sprites", "Build SVG sprites with PNG fallbacks", function() {

		var options = this.options({
			prefix: "",
			cssSuffix: "css"
		});

		var done = this.async();

		console.log("Building SVG sprites...");

		var tasks = [];

		if (options.sprites) {

			spriteElementComposer = require("dr-svg-sprites").composer;

			tasks.push(function (callback) {
				spriteElementComposer(options, callback);
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
