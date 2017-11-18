module.exports = function(route, User) {
	route.get('/users', function(req, res) {
		User.find({}, function(err, users) {
			if(err)
			throw err;
			res.json(users);
		});
	});
}
