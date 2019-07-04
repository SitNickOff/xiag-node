const express = require('express');

const Database = require('./database');

const database = new Database('mongodb://localhost:27017');

database.connect('xiag-poll')
.then(()=>console.log('Подключение к базе данных установлено'));

const app = require('./app');



const server = express();

server.database = database;

server.use(express.static(__dirname + '/public'));
server.use('/lib', express.static(__dirname + '/node_modules'));

server.use(app);

server.listen(3000, () => console.log('Сервер работает'));