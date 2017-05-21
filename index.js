'use strict'

const tonal = require('tonal')
const path = require('path')
const examples = require('node-examples')

const typeMapper = {
    standard: new Map([
        [Number, ['1P', '5P']],
        [String, ['5P', '8P']],
        [Boolean, '12P'],
        [Date, '7M'],
        [Array, '3m'],
        [Function, '9M'],
        [Object, '3M'],
    ])
}

const mapByType = mapper =>
    (key, value) => {
        const classOfValue = value.constructor

        if (mapper.has(classOfValue)) {
            return mapper.get(classOfValue)
            // Arrays, Objects and Functions instantiated by [], {} and () => {}
            // require a different approach
            // Moreover, because node-keyboard uses diff VM contexts, we have to use
            // the below approach
        } else if (Array.isArray(value)) {
            return mapper.get(Array)
        } else if (typeof value === 'function') {
            return mapper.get(Function)
        } else if (typeof value === 'object') {
            return mapper.get(Object)
        }

        // no type found
        return '1P'
    }

const shapes = {
    map: {
        byType: {
            standard(key, value) {
                return mapByType(typeMapper.standard)(key, value)
            }
        }
    },
    objToChord(key = 'C3', intervalMap = shapes.map.byType.standard) {
        return obj => {
            let intervals = Object.keys(obj).map(key => {
                const value = obj[key]
                return intervalMap(key, value, obj)
            }).reduce((acc, cur) => acc.concat(cur), []) // flatten

            // set only and sort
            intervals = [...new Set(['1P'].concat(intervals))].sort((a, b) => {
                if (a.length < b.length) return -1
                else if (b.length < a.length) return 1
                return a < b ? -1 : 1
            })

            // harmonize via tonal
            const notes = tonal.harmonize(intervals, key)

            // chord detection via tonal
            const chords = tonal.chord.detect(notes)

            return {
                intervals,
                notes,
                chords
            }
        }
    },

    createObjectListener(handler, obj = {}) {
        return new Proxy(obj, {
            set(o, prop, value) {
                o[prop] = value
                handler(prop, value)
                return value
            }
        })
    }
}

module.exports = shapes

examples({ path: path.join(__dirname, 'examples'), prefix: 'shape_example_' })
