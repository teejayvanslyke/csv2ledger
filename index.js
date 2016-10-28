var fs = require('fs')
var readline = require('readline')
var stream = require('stream')

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

function generateLedgerFromObject(object) {
    return object.date + " " + object.memo + "\n" +
        "  expenses:grocery  " + object.amount + "\n" +
        "  assets:joint\n"
}

function decorateWithAccounts(object) {
    return object
}

function onLine(line) {
    console.log(generateLedgerFromObject(
        decorateWithAccounts(
            parseLineToObject(line)
        )
    ))
}

rl.on('line', onLine)

rl.on('close', function() {
})

