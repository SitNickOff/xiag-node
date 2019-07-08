const { ObjectID } = require('mongodb');

module.exports = {
    getCollection: (req, res, next) => {
        req.questions = req.app.database.collection('questions');

        next();
    },

    findOne: async (req, res, next) => {   
        
        const question = await req.questions.findOne({ _id:ObjectID(req.params.id)});      

        if (!question) return res.sendStatus(404); 

        req.question = question;

        next();
    },

    getList: async (req, res) => {

        const questions = await req.questions.find().toArray();

        res.send(questions);
        
    },

    getListByArray: async (req, res) => {
        const questions = req.body.map(quest=>{_id:quest._id});        

        const result = await req.questions.find(questions).toArray();

        res.send(result);
    },

    create: async (req, res) => {
        const question = req.body;

        const result = await req.questions.insertOne(question);

        res.send(result);
    },

    get: async (req, res) => {

        const questions = await req.questions.findOne({ _id: ObjectID(req.params.id)});

        res.send(questions);
        
    },

    update: async (req, res)=>{
        const question = req.body;

        const result = await req.questions.updateOne({ _id: ObjectID(req.params.id)} , {$set: question});

        res.send(result);
    },

    delete: async (req, res)=>{

        const result = await req.questions.deleteOne({ _id: ObjectID(req.params.id) });

        res.send(result);
    }
}