var express = require('express');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');
var configDB = require('./config/database.js');
var configAuth = require('./config/auth.js');

// MODELSs
var User   = require('./app/models/user');
var Device   = require('./app/models/device');
var Reading = require('./app/models/reading');

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

// to enable cors
app.use(cors()); // cors enables for all domains

// CHECK body-parser docs once
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

require('./app/routes/routes.js')(app, apiRoutes, jwt, User, Device, Reading);
app.use('/api', apiRoutes);

app.listen(port);
console.log('Touch me on port : ' + port);
