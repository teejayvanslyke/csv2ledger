var importCSV = require('./importCSV')

require('yargs')
    .usage("$0 <cmd> [args]")
    .command("import [inputFile] [accountName]", "import CSV", {
        inputFile: {},
        accountName: {
            default: "assets:checking"
        }
    }, function(argv) {
        console.log("importing", argv.inputFile, argv.accountName)
        importCSV(argv.inputFile, argv.accountName)
    })
    .help()
    .argv


