var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));

router.use(bodyParser.json());


module.exports = router;

//router.use('/')
router.get('/', function(req, res) {
  res.render('index');
})

//router.get('/', express.static(__dirname+ '/public'));
