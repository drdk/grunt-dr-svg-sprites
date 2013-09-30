module.exports = function (config, callback) {

	var async = require("async"),
		_ = require("lodash"),
		fs = require("fs"),
		path = require("path"),
		fsutil = require("./fsutil"),
		svgutil = require("./svgutil");

	var elements = {},
		names = [];
	
	// get the names of all the elements
	_.forOwn(config.sprites, function (spriteElements, spriteName) {
		_.forOwn(spriteElements, function (elements) {
			names = names.concat(_.flatten(elements.map(function (element) {
				return element.name;
			})));
		});
	});
	names = _.unique(names);
	elements = _.zipObject(names, new Array(names.length));

	// load svg elements
	var tasks = {}, name;
	for (name in elements) {
		tasks[name] = (function (name) {
			return function (callback) {
				svgutil.loadShape(config.paths.elements + "/" + name + ".svg", callback);
			};
		}(name));
	}
	async.parallel(tasks, function (err, results) {
		elements = results;
		buildSpriteElements();
	});



	// build sprite elements

	function buildSpriteElements () {

		//console.log("building sprite elements...");

		var destination, spriteName, spriteElements, _elements;
		
		for (spriteName in config.sprites) {
			spriteElements = config.sprites[spriteName];
			destination = config.paths.spriteElements + "/" + spriteName;
			fsutil.mkdirRecursive(destination);
			_.forOwn(spriteElements, function (spriteElement, fileName) {
				buildSpriteElement(destination, spriteElement, fileName);
			});
			
		}

		callback(null, "sprite elements built");
	}

	function buildSpriteElement (destination, spriteElements, fileName) {

		var width = 0,
			height = 0,
			length = spriteElements.length,
			lastElement = spriteElements[length - 1],
			name = lastElement.name,
			fill = ("fill" in lastElement) ? lastElement.fill : null,
			fileName = path.relative(process.cwd(), destination + "/" + fileName + ".svg");
			
		//console.log("building sprite element:", fileName, "...");

		var svgElements = spriteElements.map(function (spriteElement, i) {
			var element = elements[spriteElement.name],
				widthOffset = (width > 0) ? (spriteElement.x || 0) : 0,
				_height = element.info.height + (spriteElement.y || 0),
				data = svgutil.transform(element.data, width + widthOffset, spriteElement.y || 0, (i == length - 1) ? fill : null);
			width += element.info.width + widthOffset;
			height = (height < _height) ? _height : height;
			return data;
		});
		fs.writeFileSync(fileName, svgutil.wrap(Math.ceil(width), height, svgElements), "utf8");
	}

};
