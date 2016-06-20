var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));

router.use(bodyParser.json());


module.exports = router;

//router.use('/')

router.get('/', function (req, res) {
  var pages = Page.findAll()
  .then(function(page) {
    res.render('index', {pages: page});
  })

});

router.get('/users/', function (req, res, next) {

})

router.get('/users/:id', function (req, res, next) {

})

router.post('/users/', function (req, res, next) {

})

router.put('/users/:id', function (req, res, next) {

})

router.delete('/users/:id', function (req, res, next) {

});


router.get('/wiki/', function (req, res, next) {
  res.redirect('/');
})

router.get('/wiki/add/', function (req,res,next) {
  res.render('addpage');
})

router.get('/wiki/:pagetitle', function (req, res, next){
  var pageurl = Page.findOne({
    where: {
      urlTitle: req.params.pagetitle
    }
  })
  .then(function (pageurl){
    res.render('wikipage', {title: pageurl.title, content: pageurl.content})
  })
  .catch(next)

})

router.post('/wiki/', function (req, res, next) {


  var existing = User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then(function(confirmedUser) {
    var page = Page.build({
      title: req.body.title,
      content: req.body.content,
      authorId: confirmedUser[0].dataValues.id
    })

    return page.save()
  })
  .then(function(page){
    res.redirect(page.route);
  })
  .catch(console.error)
})

//router.get('/', express.static(__dirname+ '/public'));

