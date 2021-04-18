//const { populate } = require('./model');
const chatModel = require('./model');

function addChat(chat){
    const myChat = new chatModel(chat);
    return myChat.save();
}

function getChats(userId){
    return new Promise( (resolve, reject) => {
        let filter = {};
        if(userId){
            filter = {
                users: userId,
            }

            chatModel.find(filter)
                .populate('users')
                .exec( (err, populated) => {
                    if(err){
                        return reject(err);
                    }
                    resolve(populated);
                });
        }
    })
    
}

module.exports = {
    add: addChat,
    list: getChats,
}