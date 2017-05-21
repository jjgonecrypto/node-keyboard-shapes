# node-keyboard-shapes

[![npm version](https://badge.fury.io/js/node-keyboard-shapes.svg)](https://badge.fury.io/js/node-keyboard-shapes)

Object shape mapper for [node-keyboard](http://github.com/justinjmoses/node-keyboard) - coverts objects into chords!

![](https://media0.giphy.com/media/3o7ZeTKcoYYyfSKSzu/giphy.gif)

## Installation

### As Global
If you installed node-keyboard globally, then install this plugin via `npm i -g node-keyboard-shapes`

Then start node keyboard via `node-keyboard`, and import this plugin via `const shapes = requireg('node-keyboard-shapes')`

### As Local
If instead you cloned node-keyboard, then install locally in that folder via `npm i node-keyboard-shapes`

Then start node keyboard via `node keyboard` and import this plugin via `const shapes = require('node-keyboard-shapes')`

## API

```javascript
shapes.objToChord(key = 'C3', intervalMap = (key, value, object) => ['1P', '3m'])(inputObject)
// returns { intervals: [...], notes: [...], chords: [...] }
```

`intervalMap` takes the `key`, `value` and `object` and must return `intervals`.
`intervals` may be a string or an array of strings. Should map to a string representation of a musical interval. See [tonal docs](http://danigb.github.io/tonal/api/module-harmonizer.html).

Provided maps:
* `shapes.map.byType.standard` (Default)

```javascript
shapes.createObjectListener(handler = (key, value) => {}, obj = {})
// returns new object that will invoke the handler every time a property is set
```

## Examples

* [type mapping](./examples/01_typeMapper.js)
* [custom mapping](./examples/02_customMapper.js)
* [object listener](./examples/03_listener.js)
