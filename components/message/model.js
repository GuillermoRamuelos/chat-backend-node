const mongoose = require('mongoose');

const schema = mongoose.Schema;

const messageSchema = new schema({
    chat: {
        type: schema.ObjectId,
        ref: 'chat',
    },
    user: {
        type: schema.ObjectId,
        ref: 'user',
    },
    message: {
        type: String,
        required: true,
    },
    date: Date,
    file: String,
});

const messageModel = mongoose.model('message', messageSchema);

module.exports = messageModel;