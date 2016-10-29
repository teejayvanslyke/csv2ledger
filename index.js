var fs = require('fs')
var readline = require('readline')
var stream = require('stream')
var _ = require('lodash')

var instream = fs.createReadStream('jointTransactionsOct2016.csv')
var outstream = new stream
var rl = readline.createInterface(instream, outstream)


function parseLineToObject(line) {
    var fields = line.split(',')

    return {
        date: fields[0],
        time: fields[1],
        amount: fields[2],
        type: fields[3],
        memo: [ fields[4], fields[5], fields[6] ].join(', ')
    }
}

function decorateWithAccounts(object) {
    return _.assign({}, object, {
        toAccount: "expenses:grocery",
        fromAccount: "assets:joint"
    })
}

function formatDate(object) {
    return _.assign({}, object, { date: object.date.replace(/-/g, '/') })
}

function generateLedgerFromObject(object) {
    return object.date + " " + object.memo + "\n" +
        "  " + object.toAccount + "  " + object.amount + "\n" +
        "  " + object.fromAccount + "\n"
}


function processLine(line) {
    return _.flow(
        parseLineToObject,
        decorateWithAccounts,
        formatDate,
        generateLedgerFromObject
    )(line)
}

function onLine(line) {
    console.log(processLine(line))
}

rl.on('line', onLine)

rl.on('close', function() {
})

