var fs = require('fs')
var readline = require('readline')
var stream = require('stream')
var _ = require('lodash')

var reducers = require('./reducers')

module.exports = function(inputFile) {
    var instream = fs.createReadStream(inputFile)
    var outstream = new stream
    var rl = readline.createInterface(instream, outstream)


    function processLine(line) {
        return _.flow(
            reducers.parseLineToObject,
            reducers.decorateWithAccounts,
            reducers.decorateWithFormattedAmount,
            reducers.formatDate,
            reducers.generateLedgerFromObject
        )(line)
    }

    var entries = []

    function onLine(line) {
        // Skip header
        if (line.startsWith('Date')) {
            return
        }

        entries.push(processLine(line))
    }

    rl.on('line', onLine)

    rl.on('close', function() {
        entries.reverse().forEach((entry) => {
            console.log(entry)
        })
    })
}
