const express = require('express');
//const morgan = require('morgan');
const notes = require('./notes');
const api = require('./api');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname);

app.locals.basedir = __dirname;

app.on('mount', server => {
    app.database = server.database;
});

//app.use(morgan('combined'));

app.use(express.urlencoded({extended: true}));

// app.get('/', (req, res)=> {
//     res.redirect('/notes');
// });

app.use('/notes', notes);
app.use('/api', api);

module.exports = app;