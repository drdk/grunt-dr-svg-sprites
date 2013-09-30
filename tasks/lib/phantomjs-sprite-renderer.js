var fs = require("fs"),
	webpage = require("webpage"),
	system = require("system");

var	input = system.args[1],
	output = system.args[2],
	width = system.args[3],
	height = system.args[4];

var page = webpage.create();

page.viewportSize = {
	width: width,
	height: height
};

page.clipRect = { 
	top: 0,
	left: 0,
	width: width,
	height: height
};

page.open(input, function () {

	page.evaluate(function(width){
		document.querySelector("svg").style.width = width + "px";
	}, width);
	
	setTimeout(function () {
		page.render(output);
		phantom.exit();
	}, 100);
	
});