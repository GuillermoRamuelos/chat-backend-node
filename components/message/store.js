const chalk = require('chalk');
const messageModel = require('./model');

function addMessage(message){
    const myMessage = new messageModel(message);
    myMessage.save();
}

async function getMessages(filterUser){
    return new Promise( (resolve, reject) => {
        let filter = {};
        if (filterUser != null){
            filter = { user: filterUser }   
        }
        messageModel.find(filter)
            .populate('user')
            .exec((err, populatedData) => {
                if(err){
                    reject(err);
                    return false;
                }

                resolve(populatedData);
            });
    })
    
}

async function updateText(id, message){
    const foundMessage = await messageModel.findById(id);

    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
}

async function deleteMessage(id){    
    return messageModel.deleteOne({
        _id: id
    });
}

module.exports = {
    add: addMessage,
    list: getMessages,
    update: updateText,
    delete: deleteMessage,
}