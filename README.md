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

## Example

```javascript
// in node-keyboard:
const shapes = require('node-keyboard-shapes')

const shape = shapes.objToChord( C3 )({ embed: {}, name: 'lucy', age: 52, ts: new Date() })
//  {
//      intervals: [ '1P', '3M', '5P', '7M' ,'8P' ],
//      notes: [ 'C3', 'E3', 'G3', 'B3', 'C4' ],
//      chords: [ 'CMaj7' ]
//  }
shape.notes.forEach(play)
```

*Or with custom mappings:*

```javascript
const shapeN = shapes.objToChord( C3, (key, value) => {
    if (typeof value !== 'number') return '5P'
    return value < 0 ? '3m' : '3M'
})({ name: 'iron man', score: -12 })
//  {
//      intervals: [ '1P', '3m', '5P' ],
//      notes: [ 'C3', 'Eb3', 'G3' ],
//      chords: [ 'Cm' ]
//  }
```
