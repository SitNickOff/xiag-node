const express = require('express');

const { MongoClient } = require('mongodb')

const app = require('./app');

const client = new MongoClient('mongodb://localhost:27017', {useNewUrlParser: true});

client.connect().then(()=>{
    console.log('Connected');
    //client.close();
});

const server = express();

server.client = client;

server.use(express.static(__dirname + '/public'));
server.use('/lib', express.static(__dirname + '/node_modules'));

server.use(app);

server.listen(3000, () => console.log('Сервер работает'));

// (async () => {
//     await client.connect();

//     console.log('Connected');
//     //console.log({client});

//     const db = client.db('notes');
//     const collection = db.collection('notes');

//     // Creat
//     // const result = await collection.insertOne({ title: 'Third Note'});
//     // console.log(result);

//     // Read
//     // const notes = await collection.find().toArray();
//     // console.log(notes);

//     // Update 
//     // const result = await collection.updateMany({ title: 'First Note!'}, { $set: { title: 'First Note'}});
//     // console.log(result);

//     // Delete
//     // const result = await collection.deleteOne({title: 'Third Note'});
//     // console.log(result);

//     client.close();
// })();