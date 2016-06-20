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

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/users/', function(req, res, next) {

})

router.get('/users/:id', function(req, res, next) {

})

router.post('/users/', function(req, res, next) {

})

router.put('/users/:id', function(req, res, next) {

})

router.delete('/users/:id', function(req, res, next) {

});


router.get('/wiki/', function(req, res, next) {
  res.redirect('/');
})

router.get('/wiki/add/', function(req,res,next) {
  res.render('addpage');
})

router.post('/wiki/', function(req, res, next) {
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  })
  //console.log(page);
  page.save()
    .then(function(page){
      console.log('content saved')
      console.log(page)
      res.redirect('/');
    })
})
//router.get('/', express.static(__dirname+ '/public'));

