module.exports = function(app, route, jwt, User) {
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
                token: token,
                user: user
              });
            }
          }
        });
      });    
}
