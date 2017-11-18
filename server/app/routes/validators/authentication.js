module.exports = function(app, route, jwt) {
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
}