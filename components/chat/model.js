const mongoose = require('mongoose');

const schema = mongoose.Schema;

const chatSchema = new schema({
    users: [
        {
            type: schema.ObjectId,
            ref: 'user'
        }
    ]
})

const messageModel = mongoose.model('chat', chatSchema);

module.exports = messageModel;