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

## The "svg_sprites" task

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
      
#### options.map
Type: `Object`



#### options.prefix
Type: `String`
Default value: `''`

Optional. Stylesheet

#### options.cssSuffix
Type: `String`
Default value: `'css'`

Optional. Stylesheet filetype suffix. 

#### options.unit
Type: `Number`

Defines unit size of the grid the sprite elements snap to. Default is 10.

#### options.sizes
Type: `Object`

A hash of size labels and values (`Number`).

```javascript
  sizes: {
    large: 30,
    small: 15
  }
```

#### options.refSize
Type: `String`

A key from the `sizes` option that relates to the basic height of your source svg-elements. All other sizes will be calculated relating to this.

        
#### options.sprites
Type: `Object`

An object 
{spriteName}


### Usage Examples

#### Default Options

```js
grunt.initConfig({
  svg_sprites: {
    options: {
      paths: {
        spriteElements: "img/_source/svg-logos",
        sprites: "img/_source/sprites",
        css: "css/shared",
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

#### Custom Options

You can even compose svg-elements from smaller elements if you define a `sprites` object. Each key will describe a sprite as an array where each index in turn describes an svg-element.

```js
grunt.initConfig({
  svg_sprites: {
    options: {
      paths: {
        elements: "img/_source/svg-logo-elements",
        spriteElements: "img/_source/svg-logos",
        sprites: "img/_source/sprites",
        css: "css/shared",
      },
      sizes: {
        xlarge: 36,
        large: 24,
        small: 16
      },
      refSize: "large",
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
