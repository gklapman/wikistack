const express = require('express')
const router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 

router.post('/', function(req, res, next) {

	User.findOrCreate({
	  where: {
	    name: req.body.name,
	    email: req.body.email
	  }
	})
	.then(function (values) {

	  var user = values[0];

	  var page = Page.build({
	    title: req.body.title,
	    content: req.body.content,
	    status: req.body.status
	  });

	  return page.save().then(function (page) {
	    return page.setAuthor(user);
	  });

	})
	.then(function (page) {
	  res.redirect(page.route);
	})
	.catch(next);


});



router.get('/', (req, res, next) => {
	//console.log("HI!!!!!!!")
    // Page.find()
    var allThePages = Page.findAll();
   //console.log("ALL THE PAGES", allThePages);
    allThePages
   	.then(allPages => {
    	res.render('index', { allPages: allPages});
    })
    .catch(function(err){
    	console.error(err);
    })


    // res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
});


// router.post('/', (req, res, next) => {
//     res.json(req.body);


// });

router.get('/add', (req, res, next) => {
    res.render('addpage', { title: 'wikistack.js' })


});

router.get('/:urlTitle', function (req, res, next) {

  Page.findOne({ 
    where: { 
      urlTitle: req.params.urlTitle 
    } 

  })
  .then(function(foundPage){
  	//console.log("FOUND PAGE IS:", foundPage);
    // res.json(foundPage);
    res.render('wikipage', {foundPage : foundPage})
  })
  .catch(next);

});


module.exports = router;


// {"route":"/wiki/DOGS","id":1,"title":"DOGS","urlTitle":"DOGS","content":"DOGS","status":"closed","date":"2017-03-13T20:42:24.000Z","createdAt":"2017-03-13T20:42:24.719Z","updatedAt":"2017-03-13T20:42:24.719Z"}







