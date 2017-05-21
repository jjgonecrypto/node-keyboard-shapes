const util = require('util')
const repl = require('repl').repl
const chalk = require('chalk')

const { play } = repl.context

const shapes = require('..')

module.exports = () => {
    const shape = shapes.objToChord('d5')({
        embed: {},
        name: 'lucy',
        age: 52,
        ts: new Date()
    })

    console.log(chalk.gray(util.inspect(shape)))

    shape.notes.forEach(play)

    return shape
}
