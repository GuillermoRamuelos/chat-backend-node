const chalk = require('chalk');
const userModel = require('./model.js');

function addUser(user){
    const myUser = new userModel(user);
    return myUser.save();
}

function getUsers(){
    return userModel.find();
}

function deleteUser(id){
    return userModel.findByIdAndDelete(id);
}

async function updateUser(id, name){
    const foundUser = await userModel.findById(id);
    foundUser.name = name;

    const newUser = await foundUser.save();
    return newUser;
}

module.exports = {
    add: addUser,
    list: getUsers,
    delete: deleteUser,
    update: updateUser,
}