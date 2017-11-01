var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');
var configDB = require('./config/database.js');
var configAuth = require('./config/auth.js');
var User   = require('./app/models/user');

var apiRoutes = express.Router();

var port = process.env.PORT || 3000;

// CONNECTION TO DATABASE
mongoose.connect(
  configDB.url,
  {
    useMongoClient: true
  }
);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected');
});
mongoose.Promise = global.Promise;

app.set('dadKey', configAuth.secret);

// CHECK body-parser docs once
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

require('./app/routes.js')(app, apiRoutes, jwt, User);
app.use('/api', apiRoutes);

app.listen(port);
console.log('Touch me on port : ' + port);
