const express = require('express');
const app = express();                      //Creamos app de Node
const server = require('http').Server(app); //Creamos server que usarà protocolo HTTP para usar en nuestra app

const config = require('./config');

const bodyParser = require('body-parser');
const db = require('./db.js');              //Referencia a archivo db.js, el cuàl conecta a aservidor de MongoDB Atlas
const router = require('./network/routes'); //Referencia a archivo routes.js
const socket = require('./socket');         //Referencia a archivo socket
const cors = require('cors');               //Referencia para usar cors

db(config.dbUrl);//Iniciamos conexiòn con servidor de MongoDB Atlas

app.use(bodyParser.json());                             //Le indicamos a la app que use el bodyParser
app.use(bodyParser.urlencoded({extended: false}));      //Le endicamos a la app que use el url encoded de bodyParser
app.use(cors());                                        //Le indicamos que use cors para que active todas las cabeceras

socket.connect(server); //Inicializamos socket con nuestro server http
router(app);            //Inicializamos el router con app

//app.use(router);
// app.use('/', function(req, res){
//     res.send('Hola Mundo');
// })

app.use(config.publicRoute, express.static('public'));

server.listen(config.port, () => {
    console.log(`La aplicaciòn està escuchando en ${config.host}:${config.port}`);
});
