const chalk = require('chalk');
const statusMessages = {
    '200': 'Done',
    '201': 'Created',
    '400': 'Invalid data',
    '500': 'Internal error',
}

exports.success = function(req, res, body, status){
    res.status(status || 200).send(
        {
            error: '', 
            body: body
        }
    );
}

exports.error = function(req, res, error, status, details){
    console.log(chalk.red('[response error]', details));
    res.status(status || 500).send(
        {
            error: error,
            body: ''
        }
    )
}