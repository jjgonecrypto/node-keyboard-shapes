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
shapes.objToChord(key = 'C3')(inputObject)
// returns { intervals: [...], notes: [...], chords: [...] }
```

## Example

```javascript
// in node-keyboard:
const shapes = require('node-keyboard-shapes')

const shape = shapes.objToChord( C3 )({ name: 'something', age: 12, ts: new Date() })
//  {
//      intervals: [ '1P', '3M', '5P', '7M' ,'8P' ],
//      notes: [ 'C3', 'E3', 'G3', 'B3', 'C4' ],
//      chords: [ 'CMaj7' ]
//  }
shape.notes.forEach(play)
```
