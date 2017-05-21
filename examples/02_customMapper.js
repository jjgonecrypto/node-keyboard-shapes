const util = require('util')
const chalk = require('chalk')

const repl = require('repl').repl
const { play } = repl.context

const shapes = require('..')

module.exports = () => {
    const myMapper = (key, value) => {
        if (typeof value !== 'number') return '5P'
        return value < 0 ? '3m' : '3M'
    }

    const shape = shapes.objToChord('Eb3', myMapper)({
        name: 'iron man',
        score: -12
    })

    console.log(chalk.gray(util.inspect(shape)))

    shape.notes.forEach(play)

    return shape
}
