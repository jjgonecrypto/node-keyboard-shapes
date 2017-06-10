const repl = require('repl').repl

const { play } = repl.context

const shapes = require('..')

module.exports = () => {
    const entries = [
        {
            name: 'Ash',
            thoughts: {}
        },
        {
            name: 'Roxanne',
            thoughts: {}
        },
        {
            name: 'Pete',
            thoughts: {}
        },
        {
            name: 'Marie',
            thoughts: [{}, {}, {}]
        },
        {
            name: 'Jennifer',
            thoughts: {}
        }
    ]

    const mapper = shapes.objToChord('eb3')

    const transformed = entries.map(mapper)

    transformed.forEach(({ notes, chords }, i) => setTimeout(() => {
        process.stdout.write(`${entries[i].name} `)
        notes.forEach(play)
    }, 500*i))

    process.stdout.write('\n')
}
