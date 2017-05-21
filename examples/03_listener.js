const util = require('util')
const chalk = require('chalk')

const repl = require('repl').repl
const { play } = repl.context

const { objToChord, createObjectListener } = require('..')

module.exports = () => {

    let target = {}

    return createObjectListener(() => {
        const shape = objToChord('Eb3')(target)

        console.log(chalk.gray(util.inspect(shape)))

        shape.notes.forEach(play)
    }, target)

    // try setting props on the returned object...
}
