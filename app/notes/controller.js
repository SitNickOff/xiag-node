const { ObjectID } = require('mongodb');

module.exports = {
    showIndex: async (req, res) => {
        const client = req.app.client;
    
        //await client.connect();
    
        const db = client.db('xiag-poll');
        const collection = db.collection('questions');
        const questions = await collection.find().toArray();
    
        //client.close();
    
        res.render('notes/views/index', { notes: questions});
    },

    showView: async (req, res) => {
        const client = req.app.client;

        const db = client.db('xiag-poll');
        const collection = db.collection('questions');
        const question = await collection.findOne({ _id: ObjectID(req.params.id) });

        if (!question) return res.redirect('/'); 

        res.render('notes/views/view', {note: question});
    },

    showCreate: (req, res) => {
        res.render('notes/views/create');
    },

    create: async (req, res) => {
        const question = req.body;

        const client = req.app.client;

        // await client.connect();

        const db = client.db('xiag-poll');
        const collection = db.collection('questions');
        await collection.insertOne(question);

        // client.close();

        res.redirect('/');
    },

    showUpdate: ()=>{},
    update: ()=>{},
    showDelete: ()=>{},
    delete: ()=>{}
};