const express = require('express');
const morgan = require('morgan');

const todos = require('../todos');
const notes = require('./notes');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname);

app.locals.basedir = __dirname;

app.on('mount', server => {
    app.client = server.client;
});

//app.use(morgan('combined'));

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=> {
    res.redirect('/notes');
});

app.use('/notes', notes);

// app.get('/', (req, res) => {
//     res.render('index', {
//         title: 'Express Todo',
//         todos
//     });
// });

// app.get('/todos', (req, res) => {
//     if (req.query.completed) {
//         return res.json(todos.filter(todo => todo.completed.toString() === req.query.completed));
//     }

//     res.send(todos);
// });

// app.get('/todos/:id', (req, res) => {
//     let todo = todos.find(todo => req.params.id == todo.id);

//     if (!todo) return res.status(404).send('Не найдено!');

//     res.send(todo);
// });

module.exports = app;