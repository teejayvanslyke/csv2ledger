var fs = require('fs')
var readline = require('readline')
var stream = require('stream')
var _ = require('lodash')

var withdrawalRules = require('./withdrawalRules')
var reducers = require('./reducers')
var importCSV = require('./importCSV')

require('yargs')
    .usage("$0 <cmd> [args]")
    .command("import [inputFile]", "import CSV", {
        inputFile: {}
    }, function(argv) {
        console.log("importing", argv.inputFile)
        importCSV(argv.inputFile)
    })
    .help()
    .argv


