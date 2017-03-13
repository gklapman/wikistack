'use strict';
var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var fs = require('fs');
var bodyParser = require('body-parser');
// var Sequelize = require('sequelize');
// var db = new Sequelize('postgres://localhost:5432/wikistack');
var models = require('./models');
var path = require('path');
const routes = require('./routes/wiki.js')

// ... other stuff

models.User.sync({ force: true })
    .then(function() {
        return models.Page.sync({ force: true })
    })
    .then(function() {
        app.listen(3000, function() { //We changed this from server.listen
            console.log('Server is listening on port 3000!');
        });
    })
    .catch(console.error);



app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
+ nunjucks.configure('views', { noCache: true });

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json());

// var server = app.listen(1337, function() {
//     console.log('listening on port 1337');
// });

app.use(express.static(path.join(__dirname, '/public')));


app.use('/wiki', routes); //


app.get('/', (req, res, next) => {
    res.render('index');

    
})
