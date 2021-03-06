var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require('swig');
var bodyParser = require('body-parser');
var router = require('./routes/index');
var path = require('path');
var models = require('./models');


app.engine('html', swig.renderFile); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
app.set('views', path.join(__dirname, '/views')); // where to find the views
swig.setDefaults({ cache: false });


app.use(morgan('dev'));

app.use('/', router);

app.use(express.static(path.join(__dirname, '/public')));


//app.use('/')

models.db.sync({force: true})
  .then(function(){
    app.listen(3000, function(){
      console.log('it worked');
    });
  })
  .catch(console.error);




// app.listen(3000);
