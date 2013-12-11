# dr-grunt-svg-sprites

> Grunt plugin to create SVG sprites with PNG fallbacks at needed sizes

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install dr-grunt-svg-sprites --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('dr-grunt-svg-sprites');
```

## The "svg-sprites" task

### Overview
In your project's Gruntfile, add a section named `svg-sprites` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	"svg-sprites": {
		options: {
			// Task-specific options go here.
		},
	},
})
```

### Options

##### options.spriteElementPath
Type: `String`

The base path of the elements to be sprited. If set on the uppermost options property the target name will automatically be appended to the path:

```javascript
	options: {
		spriteElementPath: "img/_source/spriteElements"
		/*  */
	},
	icons: {
		/*  */
	}
```

Will result in: `img/_source/spriteElements` + `/` + `icons`.

... and a file structure like:

```
	_source
		|- sprites
			|- icons
				|- print.svg
				|- email.svg
				|- link.svg
```

... you would get the resulting sprite for `icons`.

##### options.spritePath
Type: `String`

Destination path of the generated sprite images.

##### options.cssPath
Type: `String`

Optional. Destination path of the generated stylesheet. If left blank only svg sprites and png fallbacks are generated.
			
#### options.prefix
Type: `String`
Default value: `''`

Optional. Defines a prefix for the name of the sprite stylesheet and images and also classnames. 

#### options.cssSuffix
Type: `String`
Default value: `'css'`

Optional. Stylesheet filetype suffix. 

#### options.unit
Type: `Number`
Default value: `10`

Defines unit size of the grid the sprite elements snap to.

#### options.refSize
Type: `String|Number`

Defines the basic height of your source svg-elements. All other sizes will be calculated relating to this. It can either be a key from the `sizes` option (which refers to a number) or just a raw number.

![Source elements and refSize](https://raw.github.com/drdk/dr-grunt-svg-sprites/master/docs/img/docs-source-elements.png)

#### options.sizes
Type: `Object`

A hash of size labels and values (`Number`) that define the different sizes of the needed sprites.

```javascript
	sizes: {
		large: 39,
		small: 13
	}
```

![sizes](https://raw.github.com/drdk/dr-grunt-svg-sprites/master/docs/img/docs-sprite-sizes.png)

### Usage Examples

#### Basic Options

```js
grunt.initConfig({
	"svg-sprites": {
		options: {
			spriteElementPath: "img/svg-logos"
			spritePath: "img/sprites",
			cssPath: "css"
		},
		shapes: {
			options: {
				sizes: {
					large: 39,
					medium: 26,
					small: 13
				},
				refSize: "medium",
				unit: 8
			}
		}
	}
})
```


If you need to compose SVG elements you can use [dr-svg-grunt-composer](https://github.com/drdk/dr-grunt-svg-composer) to preproces them before building sprites.



---

## Changelog

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

