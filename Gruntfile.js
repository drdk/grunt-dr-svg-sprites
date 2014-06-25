/*
 * grunt-dr-svg-sprites
 * 
 *
 * Copyright (c) 2014 drdk
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		
		// Before generating any new files, remove any previously-created files.

		clean: {
			tests: ["tmp"],
			options: {
				deleteEmptyFolders: true
			}
		},

		// Configuration to be run (and then tested).
		"svg-sprites": {
			options: {
				spriteElementPath: "test/img",
				spritePath: "tmp/img/sprites",
				cssPath: "tmp/css",
				previewPath: "tmp"
			},
			shapes: {
				options: {
					prefix: "test",
					sizes: {
						small: 13,
						//medium: 26,
						large: 39
					},
					refSize: 26,
					cssPngPrefix: ".no-svg"
				}
			},
			"black-shapes": {
				options: {
					sizes: {
						medium: 26,
						large: 39
					},
					refSize: "medium",
					unit: 40,
					map: {
						"circle": "ball",
						"square": "block",
						"triangle": "pyramid"
					}
				}
			},
			"one-size": {
				options: {
					spriteElementPath: "test/img/shapes",
					unit: 10,
					cssSuffix: "less",
					cssUnit: "rem",
					layout: "alt-diagonal",
					cssSvgPrefix: ".svg",
					cssPngPrefix: ".no-svg",
					cssIncludeElementSizes: false,
					map: function (name) {
						return name.split().reverse().join();
					}
				}
			}
		}

	});
	
	// Actually load this plugin"s task(s).
	grunt.loadTasks("tasks");

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks("grunt-contrib-clean");
	
	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin"s task(s), then test the result.
	grunt.registerTask("test", ["clean", "svg-sprites"]);
	
	// By default, lint and run all tests.
	grunt.registerTask("default", ["test"]);

};
