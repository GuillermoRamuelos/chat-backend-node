const chalk = require('chalk');
const store = require('./store.js');

function addChat(users){
    if(!users || !Array.isArray(users)){
        console.log(chalk.red('[chatController] Users array is required'));
        return Promise.reject('Invalid or null Users');
    }

    const chat = {
        users: users
    }
    return store.add(chat);
}

function getChats(userId){
    return store.list(userId);
}

module.exports = {
    addChat,
    getChats,
}