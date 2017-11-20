module.exports = function(app, route, request, jwt, User, Device, Reading) {
	
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
			},
			{
				'link-appender': '/register-device',
				'req-type': 'POST',
				'for': 'Admin'
			},
			{
				'link-appender': '/add-device',
				'req-type': 'POST'
			},
			{
				'link-appender': '/enter-reading',
				'req-type': 'POST'
			},
			{
				'link-appender': '/device-detail',
				'req-type': 'POST'
			}
		];
		res.json(result);
	});
	
	require('./login.js')(app, route, jwt, User);
	require('./signup.js')(route, User);
	require('./registerDevice.js')(app, route, request, Device);
	require('./enterReading.js')(route, Device, Reading);
	
	// authentication middleware
	require('./validators/authentication.js')(app, route, jwt);

	require('./users.js')(route, User);
	require('./addDevice.js')(route, User, Device);
	require('./devicesDetails.js')(route, Device);
	require('./getReadings.js')(route,Reading);

}
