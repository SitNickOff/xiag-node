const express = require('express');
const WebSocket = require('ws');

const Settings = require('./config');
const Database = require('./database');

const database = new Database(Settings.MongоDBHost);

database.connect('xiag-poll');
database.on('connect', ()=>console.log('Подключение к базе данных установлено'));
database.on('disconnect', ()=>console.log('Подключение к базе данных остановлено'));

const app = require('./app');

const server = express();
const wsServer = new WebSocket.Server({port: Settings.WebSocketPort});

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

server.listen(Settings.ServerPort, () => console.log('Сервер работает'));

wsServer.on('connection', ws => {
    ws.on('message', message => {
        wsServer.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }    
        });
    });
});

process.on('SIGINT', () => {
    database.close().then(() => process.exit(0));
});