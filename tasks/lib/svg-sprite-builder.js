module.exports = function (config, callback) {

	var async = require("async"),
		phantomjs = require("phantomjs").path,
		fs = require("fs"),
		path = require("path"),
		exec = require("child_process").exec,
		fsutil = require("./fsutil"),
		svgutil = require("./svgutil");
	
	var unit = config.unit || 10;

	var root = path.relative(process.cwd(), config.paths.spriteElements),
		spriteNames = fsutil.getDirs(root),
		spriteName,
		i = 0,
		l = spriteNames.length,
		suffix = ".svg",
		spriteElements, spriteElement;
		
	var spriteTasks = {};
	while (i < l) {
		spriteName = spriteNames[i];
		spriteElements = fsutil.getFiles(root + "/" + spriteName, suffix).map(function(spriteElement){
			return root + "/" + spriteName + "/" + spriteElement;
		});
		spriteElements.sort();
		spriteTasks[spriteName] = (function (_spriteName, _spriteElements) {
			return function (callback) {
				buildSVGSprite(_spriteName, _spriteElements, callback);	
			};
		}(spriteName, spriteElements));
		i++;
	}
	async.parallel(spriteTasks, buildCSS);

	// build css and fallback pngs for all sizes

	function buildCSS (err, sprites) {

		var cssFileName = config.paths.css + "/" + joinName(config.prefix, "sprites") + "." + config.cssSuffix,
			css = "",
			spriteName, sprite,
			element,
			source,
			className,
			sizeLabel, size, refSize, scale,
			classes, svgClasses,
			pngSpritesToBuild = [];

		var cssElementRule = "\n\
{selector} {\n\
	width: {width}px;\n\
	height: {height}px;\n\
	background-position: -{x}px 0;\n\
}\n\
",
		cssSpriteRule = "\n\
{selector} {\n\
	background-image: url({spriteUrl});\n\
	background-size: {width}px {height}px;\n\
}\n\
",
		cssSVGSpriteImageRule = "\n\
{selector} {\n\
	background-image: url({spriteUrl});\n\
}\n\
";



		for (spriteName in sprites) {
			sprite = sprites[spriteName];
			classes = [];
			var spriteSelectors,
				svgSelectors = [],
				sourceSprite = config.paths.sprites + "/" + joinName(config.prefix, spriteName, "sprite") + ".svg";

			var i = 0,
				l = sprite.elements.length;
			while (i < l) {
				element = sprite.elements[i];
				pseudoClassName = element.className;
				className = makeClassName(pseudoClassName, sizeLabel);
				classes.push(className);
				i++;
			}
			
			/*	
			// add rule for setting svg sprite image
			classes.forEach(function (className) {
				var pngSelector = className.replace(/^(dr-logo-[^-]+).*$/, "[class*=\"$1\"][class*=\"{size}\"]");
				if (spriteSelectors.indexOf(className) < 0) {
					spriteSelectors.push(className);
				}
				var svgSelector = className.replace(/^(dr-logo)(-[^-]+).*$/, "[class*=\"$1\"][class*=\"$2\"]");
				if (svgSelectors.indexOf(className) < 0) {
					svgSelectors.push(className);
				}
			});
			*/

			for (sizeLabel in config.sizes) {

				size = config.sizes[sizeLabel];
				refSize = config.sizes[config.refSize];
				spriteSelectors = [];

				i = 0,
				l = sprite.elements.length;
				while (i < l) {
					element = sprite.elements[i];
					pseudoClassName = element.className;
					className = makeClassName(pseudoClassName, sizeLabel);
					spriteSelectors.push(className);
					svgSelectors.push(className);
					css += substitute(cssElementRule, {
						selector: className,
						width: scaleValue(element.width, size, refSize),
						height: scaleValue(element.height, size, refSize),
						x: scaleValue(element.x, size, refSize)
					});
					i++;
				}

				var filename = config.paths.sprites + "/" + joinName(config.prefix, spriteName, sizeLabel, "sprite") + ".png",
					width = scaleValue(sprite.width, size, refSize),
					height = scaleValue(sprite.height, size, refSize);

				// set image and size for png
				css += substitute(cssSpriteRule, {
					selector: spriteSelectors.join(",\n"),
					spriteUrl: path.relative(config.paths.css, filename).replace(/\\/g, "/"),
					width: width,
					height: height
				});

				(function (sourceSprite, filename, width, height) {
					pngSpritesToBuild.push(function (callback) {
						buildPNGSprite(sourceSprite, filename, width, height, callback);
					});
				} (sourceSprite, filename, width, height));

			}

			// set image for svg
			css += substitute(cssSVGSpriteImageRule, {
				selector: ".svg " + svgSelectors.join(",\n.svg "),
				spriteUrl: path.relative(config.paths.css, sourceSprite).replace(/\\/g, "/")
			});
		}

		fs.writeFileSync(path.relative(process.cwd(), cssFileName), css, "utf8");

		async.parallel(pngSpritesToBuild, function (err, result) {
			callback(null, "sprites built");
		});

	}

	// functions

	function scaleValue (value, newSize, oldSize) {
		return Math.ceil(value * newSize / oldSize);
	}

	function buildSVGSprite (spriteName, files, callback) {
		
		//console.log("building SVG sprite:", spriteName, "...");

		var tasks = {},
			file,
			i = 0,
			l = files.length;
		while (i < l) {
			file = files[i];
			tasks[file] = (function (file) {
				return function (_callback) {
					svgutil.loadShapeRaw(file, _callback);
				};
			}(file));
			i++;
		}

		fsutil.mkdirRecursive(config.paths.sprites);

		async.parallel(tasks, function (err, results) {
			var spriteData = {
					elements: []
				},
				spriteHeight = 0, 
				className,
				logoUnitWidth = 0,
				elements = [],
				svg,
				x = 0;
				
			for (var filename in results) {
				svg = results[filename];
				className = filename.slice(filename.lastIndexOf("/") + 1, -suffix.length);
				elementUnitWidth = roundUpToUnit(svg.info.width);
				if (spriteHeight < svg.info.height) {
					spriteHeight = svg.info.height;
				}
				spriteData.elements.push({
					className: className,
					width: Math.ceil(svg.info.width),
					height: svg.info.height,
					x: x
				});
				elements.push(svgutil.transform(svg.data, x, 0));
				x += elementUnitWidth + unit;
			}

			x = roundUpToUnit(x);
			spriteHeight = roundUpToUnit(spriteHeight);
			spriteData.width = x;
			spriteData.height = spriteHeight;

			fs.writeFileSync(path.relative(process.cwd(), config.paths.sprites + "/" + joinName(config.prefix, spriteName, "sprite") + ".svg"), svgutil.wrap(x, spriteHeight, elements), "utf8");
			callback(null, spriteData);
		});
	}

	function buildPNGSprite (input, output, width, height, callback) {
		
		//console.log("building PNG sprite:", output, "...");

		var script = path.join(__dirname, "phantomjs-sprite-renderer.js"),
			args = [phantomjs, script, path.relative(__dirname, input), path.relative(__dirname, output), width, height].join(" ");

		var pjs = exec(args, {
				cwd: __dirname,
				//timeout: 5000,
				maxBuffer: 5000*1024 // png data gets quite large
			}, function (error, stdout, stderr) {
			if (error) {
				console.error("Error", error);
			}
			else if (stderr) {
				console.error("Stderr", stderr);
			}
			else if (stdout) {
				console.log(stdout);
			}
			callback(null, output);
		});

	}

	function roundUpToUnit (num) {
		var dif = num % unit;
		return (dif) ? num + unit - dif : num;
	}

	function joinName () {
		var args = [].slice.call(arguments);
		return args.filter(function(arg){ return !!arg; }).join("-");
	}

	function makeClassName (string, sizeLabel) {

		if (string.indexOf("{size}") > -1) {
			return substitute(string, {size: sizeLabel});
		}
		else {
			string += "-" + sizeLabel;
		}
		
		return ((string[0] != ".") ? "." : "") + string;
	}

	function substitute (string, object) {
		return string.replace(/\{([^ \}]+)\}/g, function (match, token) {
			return (token in object) ? object[token]: match;
		});
	}

};
