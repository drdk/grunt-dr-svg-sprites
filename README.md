# grunt-dr-svg-sprites
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/drdk/grunt-dr-svg-sprites?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> Grunt plugin to create SVG sprites with PNG fallbacks at needed sizes

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-dr-svg-sprites --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-dr-svg-sprites');
```

## The "svg-sprites" task

### Overview
In your project's Gruntfile, add a section named `dr-svg-sprites` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	"dr-svg-sprites": {
		options: {
			// Task-specific options go here.
		},
	},
});
```

### Options

The options are inherited from [dr-svg-sprites](https://github.com/drdk/dr-svg-sprites#options) with the following differences:

##### options.name

This will automatically be the target name. No need to manually add it.

##### options.spriteElementPath
Type: `String`

The base path of the elements to be sprited.

If set in the target options it will overwrite the global options.

If set on the uppermost options property the target name will automatically be appended to the path:

```js
grunt.initConfig({
	"dr-svg-sprites": {
		options: {
			spriteElementPath: "img",
			// more options
		},
		shapes: {
			options: {
				// more options
			}
		}
	}
});
```

Will result in: `img/shapes`.

... and a file structure like:

```
	img
		|- shapes
			|- circle.svg
			|- square.svg
			|- triangle.svg
```

... you would get the resulting sprite for `shapes`.



### Usage Examples

#### Basic Options

```js
grunt.initConfig({
	"dr-svg-sprites": {
		tv: {
			options: {
				spriteElementPath: "img/logos/tv",
				spritePath: "img/sprites/dr-logos-tv-sprite.svg",
				cssPath: "css/dr-logos-tv-sprite.css"
			}
		}
	}
});
```

#### Example of a task with multiple sprites configured

```js
grunt.initConfig({
	"dr-svg-sprites": {
		options: {
			spriteElementPath: "img/logos",
			spritePath: "img/sprites",
			cssPath: "css",
			prefix: "dr-logos"
		},
		tv: {
			options: {
				sizes: {
					large: 24,
					small: 16
				},
				refSize: "large",
				unit: 6
			}
		},
		radio: {
			options: {
				sizes: {
					small: 16
				},
				refSize: 24,
				unit: 12,
				cssUnit: "rem"
			}
		}
	}
});
```


---

## Changelog

### 0.9.30

Changes:

* Updated dependencies.

### 0.9.15

Changes:

* Task is now more accurately named `dr-svg-sprites` instead of `svg-sprites` to allow smoother usage with more strict grunt task loaders like [jit-grunt](https://github.com/shootaroo/jit-grunt). The `svg-sprites` name is not yet deprecated though - both names can be used.

### 0.9.0

Changes:

* Moved all documentation not directly related to the grunt wrapper to [dr-svg-sprites](https://github.com/drdk/dr-svg-sprites). All future issues regarding anything other than the grunt wrapper should be posted there :)

### 0.5.5

**Important!** Renamed repo and npm module to `grunt-dr-svg-sprites` inlining with standard naming convention for grunt tasks. `dr-grunt-svg-sprites` is now deprecated.

### 0.5.3

Features:

* `options.cssPprefix` added.

### 0.5.0

Features:

* Proper target support.

Changes:

* `options.paths` properties have become: `spriteElementPath`, `spritePath` and `cssPath`.
* `options.sprites` should now be configured as separate targets.

### 0.2.8

Bug fixes:

* Fixes creation of fallback pngs in wrong location.

### 0.2.7

Features:

* `options.prefix` will now affect classnames also.
* `options.refSize` is now no longer limited to sizes defined in `options.sizes`; it can take a raw number.  


[![Analytics](https://ga-beacon.appspot.com/UA-8318361-2/drdk/grunt-dr-svg-sprites)](https://github.com/igrigorik/ga-beacon)
