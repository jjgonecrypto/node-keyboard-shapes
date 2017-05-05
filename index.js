'use strict'

const tonal = require('tonal')

module.exports = {
    objToChord(key = 'C3') {
        return obj => {
            let intervals = Object.keys(obj).map(key => {
                if (typeof obj[key] === 'string') return ['5P', '8P']
                else if (typeof obj[key] === 'boolean') return '12P'
                else if (typeof obj[key] === 'number') return ['3M', '5P']
                else if (obj[key] instanceof Date) return '7M'
                // else if (Array.isArray(obj[key])) return '9M' // maybe this should be an array of notes?
                // else if (typeof obj[key] === 'object') return '7m' // maybe this should be the inner types
                else return '1P'
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
