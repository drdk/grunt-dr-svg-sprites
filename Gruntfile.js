/*
 * dr-grunt-svg-sprites
 * 
 *
 * Copyright (c) 2013 rasmusfl0e
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		jshint: {
			all: [
				"Gruntfile.js",
				"tasks/*.js",
				"<%= nodeunit.tests %>",
			],
			options: {
				jshintrc: ".jshintrc",
			},
		},
		
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
				cssPath: "tmp/css"
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
					unit: 5
				}
			},
			"black-shapes": {
				options: {
					sizes: {
						medium: 26
					},
					refSize: "medium",
					unit: 40
				}
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ["test/*_test.js"],
		}

	});
	
	// Actually load this plugin"s task(s).
	grunt.loadTasks("tasks");

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-nodeunit");
	
	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin"s task(s), then test the result.
	grunt.registerTask("test", ["clean", "svg-sprites"/*, "nodeunit"*/]);
	
	// By default, lint and run all tests.
	grunt.registerTask("default", ["jshint", "test"]);

};
