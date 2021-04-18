const express = require('express');
const multer = require('multer');

const config = require('../../config');
const router = express.Router();
const controller = require('./controller.js');
const response = require('../../network/response');
const chalk = require('chalk');

const upload = multer({
    dest: 'public' + config.filesRoute + '/',
})

router.get('/', (req, res) =>  {
    const filterMessages = req.query.user || null;

    console.log(req.headers);
    res.header({
        "Custom-Header": "Nuestro valor personalizado"
    })
    
    controller.getMessages(filterMessages)
        .then( (messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch( e => {
            response.error(req, res, "Unexpected Error", 500, e);
        })
});

router.post('/', upload.single('file'), (req, res) => {
    console.log("Request body ", req.body);
    console.log("Query parameters ", req.query);

     controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);    
        })
        .catch(e => {
            response.error(req, res, "Invalid information", 400, e);
        });    

});

router.patch('/:id', (req, res) => {
    console.log('Id a modificar ', req.params.id);

    controller.updateMessage(req.params.id, req.body.message)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch(e => {
        response.error(req, res, 'Data not modified', 500, e);
    });
})

router.delete('/:id', (req, res) => {
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `Message ${req.params.id} deleted`, 200);
        })
        .catch( e => {
            response.error(req, res, 'Data not deleted', 500, e);
        });
});

module.exports = router;