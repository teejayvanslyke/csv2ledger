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
        amount: Math.abs(parseFloat(fields[2])),
        type: fields[3],
        memo: [ fields[4], fields[5], fields[6] ].join(', ')
    }
}

function decorateWithAccounts(object) {
    switch (object.type) {
        case "Deposit":
            return _.assign({}, object, {
                fromAccount: "income:default",
                toAccount: "assets:joint"
            })
        default:
            return _.assign({}, object, {
                toAccount: "expenses:default",
                fromAccount: "assets:joint"
            })
    }
}

function decorateWithFormattedAmount(object) {
    var formattedAmount = '$' + object.amount.toFixed(2)
    return _.assign({}, object, { formattedAmount: formattedAmount })
}

function formatDate(object) {
    return _.assign({}, object, { date: object.date.replace(/-/g, '/') })
}

function generateLedgerFromObject(object) {
    return object.date + " " + object.memo + "\n" +
        "  " + object.toAccount + "  " + object.formattedAmount + "\n" +
        "  " + object.fromAccount + "\n"
}


function processLine(line) {
    return _.flow(
        parseLineToObject,
        decorateWithAccounts,
        decorateWithFormattedAmount,
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

