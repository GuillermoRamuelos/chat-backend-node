const db = require('mongoose');
const chalk = require('chalk');

db.Promise = global.Promise;

async function connect(url){

    await db.connect (url, {
        useNewUrlParser: true,
    }).then(()=>{
        console.log(chalk.green('[db] Connection succesfully'));
    }).catch((err)=>{
        console.log(chalk.red('[db] Error ' + err));
    });
}

module.exports = connect;