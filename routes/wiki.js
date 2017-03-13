const express = require('express')
const Page = require('../models').Page
const User = require('../models').User
const router = express.Router();

router.get('/', (req, res, next) => {

    // Page.find()

   
    res.redirect('/');


    // res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
});


router.post('/', (req, res, next) => {
    res.send('got to POST/wiki');


});

router.get('/add', (req, res, next) => {
    res.render('addpage', { title: 'wikistack.js' })


});


module.exports = router;
