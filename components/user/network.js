const express = require('express');

const router = express.Router();
const controller = require('./controller.js');
const response = require('../../network/response');
const chalk = require('chalk');

router.post('/', (req, res) => {
    controller.addUser(req.body.name)
        .then( (data) => {
            response.success(req, res, data, 201);
        })
        .catch( e => {
            response.error(req, res, 'User not added', 500, e);
        });
});

router.get('/', (req, res) => {
    controller.getUsers()
        .then( (data) => {
            response.success(req, res, data, 200);
        })
        .catch( e => {
            response.error(req, res, 'Unexpected error', 500, e);
        })
});

router.delete('/:id', (req, res) => {
    controller.deleteUser(req.params.id)
        .then( () => {
            response.success(req, res, `User ${req.params.id} deleted`, 200);
        })
        .catch( e=> {
            response.error(req, res, 'Data not deleted', 500, e);
        })
})

router.patch('/:id', (req, res) => {
    controller.updateUser(req.params.id, req.body.name)
        .then( data => {
            response.success(req, res, data, 200);
        })
        .catch( e => {
            response.error(req, res, 'User not modified', 500, e);
        })
})

module.exports = router;