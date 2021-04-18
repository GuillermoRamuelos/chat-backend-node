const chalk = require("chalk");
const store = require('./store.js');
const { socket } = require('../../socket');//Nos traemos el objeto socket del archivo socket.js
//const socket = require('../../socket').socket; Esta linea hace lo mismo que la linea de arriba

const config = require('../../config');

function getMessages(filterUser){
    return new Promise( (resolve, reject) => {
        resolve(store.list(filterUser));
    })
}

function addMessage(chat, user, message, file){
    return new Promise( (resolve, reject) => {
        if(!chat || !user || !message){
            console.log(chalk.red('[messageController] There is not chat, user or message'));
            return reject('Inavlid data');
        }

    let fileUrl = '';
    if(file){
        fileUrl = config.host + ':' + config.port + config.publicRoute + config.filesRoute + '/' + file.filename;
    }

        const fullMessage = {
            chat, chat,
            user: user,
            message: message,
            date: new Date(),
            file: fileUrl,
        }

        store.add(fullMessage);

        //Emitir mensaje por socket
        socket.io.emit('message', fullMessage);

        resolve(fullMessage);
    });
        
}

async function updateMessage(id, text){
    return new Promise(async (resolve, reject) => {
        if(!id || !text){
            return reject('Invalid data');
            //return false;
        }

        const result = await store.update(id, text);        
        resolve(result);
    })
}

function deleteMessage(id){
    return new Promise( (resolve, reject) => {
        if(!id){
            console.log(chalk.red('[messageController] Id missing'));
            return reject('Id missing');            
        }else{
            store.delete(id)
            .then( () => {
                resolve();
            })
            .catch( e => {
                reject(e);
            });
        }
        
    })
}

module.exports = {
    addMessage,
    getMessages,
    deleteMessage,
    updateMessage,
}