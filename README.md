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


#### options.paths

Type: `Object`


##### options.paths.spriteElements
Type: `String`

Sprites will be generated from each subfolder and its contained svg-elements.

Given:

```javascript
  paths: {
    spriteElements: "img/_source/sprites/",
```

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

##### options.paths.sprites
Type: `String`

Destination path of the generated sprite images.

##### options.paths.css
Type: `String`

Destination path of the generated stylesheet.

##### options.paths.elements
Type: `String`

Optional. Source path of svg elements to composite sprite-elements.
      
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

#### options.sizes
Type: `Object`

A hash of size labels and values (`Number`) that define the different sizes of the needed sprites.

```javascript
  sizes: {
    large: 30,
    small: 15
  }
```

#### options.refSize
Type: `String|Number`

Defines the basic height of your source svg-elements. All other sizes will be calculated relating to this. It can either be a key from the `sizes` option (which refers to a number) or just a raw number.

        
#### options.sprites
Type: `Object`

An object 
{spriteName}


### Usage Examples

#### Basic Options

```js
grunt.initConfig({
  "svg-sprites": {
    options: {
      paths: {
        spriteElements: "img/svg-logos",
        sprites: "img/sprites",
        css: "css",
      },
      sizes: {
        xlarge: 36,
        large: 24,
        small: 16
      },
      refSize: "large",
      unit: 8,
    },
  },
})
```

#### Advanced Options

You can even compose svg-elements from smaller elements if you define a `sprites` object. Each key will describe a sprite as an array where each index in turn describes an svg-element.

```js
grunt.initConfig({
  "svg-sprites": {
    options: {
      paths: {
        elements: "img/svg-logo-elements",
        spriteElements: "img/svg-logos",
        sprites: "img/sprites",
        css: "css",
      },
      sizes: {
        xlarge: 36,
        small: 16
      },
      refSize: 24,
      unit: 8,
    },
    sprites: {
      shapes: [
        {
          name: "trangle-circle",
          elements: [
            {name: "triangle"},
            {name: "circle", x: -5, fill: "#000"}
          ]
        },
        {
          name: "triangle-square",
          elements: [
            {name: "triangle", fill: "#F00"},
            {name: "square", x: -10, y: 5}
          ]
        }
      ]
    },
  },
})
```

---

## Changelog

### 0.2.8

Bug fixes:

* Fixes creation of fallback pngs in wrong location.

### 0.2.7

Features:

* `options.prefix` will now affect classnames also.
* `options.refSize` is now no longer limited to sizes defined in `options.sizes`; it can take a raw number.  

