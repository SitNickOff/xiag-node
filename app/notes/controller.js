const { ObjectID } = require('mongodb');

module.exports = {
    getCollection: (req, res, next) => {
        req.questions = req.app.database.collection('questions');

        next();
    },

    findOne: async (req, res, next) => {        
        const question = await req.questions.findOne({ _id: ObjectID(req.params.id) });

        if (!question) return res.redirect('/notes'); 

        req.question = question;

        next();
    },

    showIndex: async (req, res) => {
        const questions = await req.questions.find().toArray();
    
        res.render('notes/views/index', { 
            notes: questions 
        });
    },

    showView: async (req, res) => {
        res.render('notes/views/view', { 
            note: req.question 
        });
    },

    showCreate: (req, res) => {
        res.render('notes/views/create');
    },

    showUpdate: async (req, res)=>{
        res.render('notes/views/update', { 
            note: req.question 
        });
    },

    showDelete: async (req, res)=>{
        res.render('notes/views/delete', { 
            note: req.question 
        });
    },

    create: async (req, res) => {
        const question = req.body;

        await req.questions.insertOne(question);

        res.redirect('/notes');
    },

    update: async (req, res)=>{
        await req.questions.updateOne({ _id: ObjectID(req.params.id) } , { $set: req.body });

        res.redirect(`/notes/${req.params.id}`)
    },
    
    delete: async (req, res)=>{
        await req.questions.deleteOne({ _id: ObjectID(req.params.id) });

        res.redirect('/notes');
    }
};