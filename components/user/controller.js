const chalk = require("chalk");
const store = require('./store.js');

function addUser(name){
    if (!name) {
        console.log(chalk.red('[userController] There is not user name'));
        return Promise.reject('Invalid user name');
    }

    const user = {
        name: name,
    }
    
    return store.add(user);
}

function getUsers(){
    return store.list();
}

function deleteUser(id){
    return new Promise( (resolve, reject) => {
        if(!id){
            console.log(chalk.red('[userController] Id is missing'));
            return Promise.reject('Id is required');
        }
    
        store.delete(id)
            .then(()=>{
                resolve();
            })
            .catch( e=> {
                reject(e);
            });
    })
}

async function updateUser(id, name){
    return new Promise( async (resolve, reject) => {
        if(!id || !name){
            console.log(chalk.red('[userController] Id and name is required'));
            return reject('Invalid ID or user name');
        }
    
        const result = await store.update(id, name);
        resolve(result);
    })
    
}

module.exports = {
    addUser,
    getUsers,
    deleteUser,
    updateUser,
}