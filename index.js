'use strict'

const tonal = require('tonal')

module.exports = {
    objToChord(key = 'C3', mappings = new Map([
        [Number, ['3M', '5P']],
        [String, ['5P', '8P']],
        [Boolean, '12P'],
        [Date, '7M'],
        [Array, '3m'],
        [Function, '9m'],
        [Object, '8P'],
    ])) {
        return obj => {
            let intervals = Object.keys(obj).map(key => {
                const value = obj[key]
                const classOfValue = value.constructor

                if (mappings.has(classOfValue)) {
                    return mappings.get(classOfValue)
                    // Arrays, Objects and Functions instantiated by [], {} and () => {}
                    // require a different approach
                    // Moreover, because node-keyboard uses diff VM contexts, we have to use
                    // the below approach
                } else if (Array.isArray(value)) {
                    return mappings.get(Array)
                } else if (typeof value === 'function') {
                    return mappings.get(Function)
                } else if (typeof value === 'object') {
                    return mappings.get(Object)
                }

                // no type found
                return '1P'
            }).reduce((acc, cur) => acc.concat(cur), []) // flatten

            // set only and sort
            intervals = [...new Set(['1P'].concat(intervals))].sort()

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
    }
}
