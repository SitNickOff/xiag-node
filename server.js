const express = require('express');


const Database = require('./database');

const database = new Database('mongodb://localhost:27017');

database.connect('xiag-poll');
database.on('connect', ()=>console.log('Подключение к базе данных установлено'));
database.on('disconnect', ()=>console.log('Подключение к базе данных остановлено'));

const app = require('./app');

const server = express();

server.database = database;

server.use(express.static(__dirname + '/public'));
server.use('/lib', express.static(__dirname + '/node_modules'));

server.use((req, res, next)=>{
    res.header('Cache-Control', 'no-cache');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
})

server.use(app);

server.listen(5000, () => console.log('Сервер работает'));

process.on('SIGINT', () => {
    database.close().then(() => process.exit(0));
});