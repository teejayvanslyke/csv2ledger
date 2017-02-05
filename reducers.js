var _ = require('lodash')
var withdrawalRules = require('./withdrawalRules')

exports.parseLineToObject = function(line) {
    var fields = line.split(',')

    return {
        date: fields[0],
        time: fields[1],
        amount: Math.abs(parseFloat(fields[2])),
        type: fields[3],
        memo: [ fields[4], fields[5], fields[6] ].join(', ')
    }
}


function isFunctionRule(rule) {
    return typeof(rule.match) === 'function'
}

function objectMatchesRule(object, rule) {
    return (
        (isFunctionRule(rule) && rule.match(object)) ||
        (object.memo.indexOf(rule.match) > -1)
    )
}

function decorateWithWithdrawalAccounts(object) {
    for (var i=0; i<withdrawalRules.length; i++) {
        var rule = withdrawalRules[i]

        if (objectMatchesRule(object, rule)) {
            return _.assign({}, object, {
                toAccount: rule.to,
                memo: rule.memo + ' - ' + object.memo
            })
        }
    }

    return _.assign({}, object, {
        toAccount: "expenses:entertainment:dining"
    })
}

exports.decorateWithAccounts = function(object) {
    switch (object.type) {
        case "Deposit":
            return _.assign({}, object, {
                fromAccount: "income:default",
                toAccount: global.config.accountName
            })
        default:
            return decorateWithWithdrawalAccounts(
                _.assign({}, object, { fromAccount: global.config.accountName })
            )
    }
}

exports.decorateWithFormattedAmount = function(object) {
    var formattedAmount = '$' + object.amount.toFixed(2)
    return _.assign({}, object, { formattedAmount: formattedAmount })
}

exports.formatDate = function(object) {
    return _.assign({}, object, { date: object.date.replace(/-/g, '/') })
}

exports.generateLedgerFromObject = function(object) {
    return object.date + " " + object.memo + "\n" +
        "  " + object.toAccount + "  " + object.formattedAmount + "\n" +
        "  " + object.fromAccount + "\n"
}

