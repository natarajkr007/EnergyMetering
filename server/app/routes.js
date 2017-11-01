module.exports = function(app, route, jwt, User) {

  route.get('/', function(req, res) {
    var result = [
      {
        'link-appender': '/login',
        'req-type': 'POST'
      },
      {
        'link-appender': '/signup',
        'req-type': 'POST'
      },
      {
        'link-appender': '/users',
        'req-type': 'GET',
      }
    ];
    res.json(result);
  });

  route.post('/login', function(req, res) {
    User.findOne({
      'local.email': req.body.username
    }, function(err, user) {
      if(err) throw err;

      if(!user) {
        res.json({
          success: false,
          message: 'username or password is wrong'
        });
      } else if (user) {
        if(!user.validPassword(req.body.password)){
          res.json({
            success: false,
            message: 'password entered is wrong'
          });
        } else {
          const payload = {
            admin: user.local.firstname
          };
          var token = jwt.sign(payload, app.get('dadKey'), {
            expiresIn: 60*60*24 // expires in 24 hours
          });
          res.json({
            success: true,
            message: 'token sent',
            token: token
          });
        }
      }
    });
  });

  route.post('/signup', function(req, res) {
    User.findOne({
      'local.email': req.body.email
    }, function(err, user) {
      if(err) throw err;

      if (user) {
        res.json({
          success: false,
          message: 'Email already exists'
        });
      } else {
        var newUser = User();

        newUser.local.firstname = req.body.firstname;
        newUser.local.lastname = req.body.lastname;
        newUser.local.email = req.body.email;
        newUser.local.password = newUser.generateHash(req.body.password);

        newUser.save(function(err) {
          if (err) throw err;

          return res.json({
            success: true,
            message: 'User became homie'
          });
        });
      }
    });
  });

  route.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, app.get('dadKey'), function(err, decoded) {
        if (err) {
          return res.json({
            success: false,
            message: 'token authentication failed'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'homies allowed but token needed'
      });
    }
  });

  route.get('/users', function(req, res) {
    User.find({}, function(err, users) {
      if(err)
        throw err;
      res.json(users);
    });
  });

}
