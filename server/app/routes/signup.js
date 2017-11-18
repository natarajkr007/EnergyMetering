module.exports = function(route, User) {
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
}