'use strict'

const tonal = require('tonal')

module.exports = {
    objToChord(obj = {}, key = 'C3') {
        const intervals = Object.keys(obj).map(key => {
            if (typeof obj[key] === 'string') return 'P5'
            else if (typeof obj[key] === 'boolean' && obj[key]) return 'M3'
            else if (typeof obj[key] === 'boolean' && !obj[key]) return 'm3'
            else if (typeof obj[key] === 'number') return ['M3', 'P8']
            else if (obj[key] instanceof Date) return 'M11'
            else if (Array.isArray(obj[key])) return 'M9'
            else if (typeof obj[key] === 'object') return 'm7'
            else return 'P1'
        }).reduce((acc, cur) => acc.concat(cur), [])

        const notes = tonal.harmonize(['P1'].concat(intervals), key)
        console.log('Possible chords: ', tonal.chord.detect(notes).join(', '))
        console.log(notes)
        return notes
    }
}
