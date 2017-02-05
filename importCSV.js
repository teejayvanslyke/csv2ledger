var fs = require('fs')
var readline = require('readline')
var stream = require('stream')
var _ = require('lodash')

var reducers = require('./reducers')

function processLine(line, accountName) {
    return _.flow(
        reducers.parseLineToObject,
        reducers.decorateWithAccounts,
        reducers.decorateWithFormattedAmount,
        reducers.formatDate,
        reducers.generateLedgerFromObject
    )(line)
}

module.exports = function(inputFile, accountName) {
    var instream = fs.createReadStream(inputFile)
    var outstream = new stream
    var rl = readline.createInterface(instream, outstream)


    var entries = []

    global.config = {
        accountName: accountName
    }

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
