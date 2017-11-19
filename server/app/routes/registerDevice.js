var geoData = require('../models/geoSchema.js');

module.exports = function(app, route, request, Device) {
	route.post('/register-device', function(req, res) {
		Device.findOne({
			'serial': req.body.serial
		}, function(err, device) {
			if (err) throw err;

			if (device) {
				res.json({
					success: false,
					message: 'The device is already registered. Check the serial key.'
				});
			} else {
				var newDevice = Device();
				var reqUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + req.body.lat + "," + req.body.lng + "&key=" + app.get('geoDecodeKey');

				request(reqUrl, function(err, response, body) {
					if (err) throw err;

					body = JSON.parse(body);					
					if (body.status === 'OK'){
						newDevice.serial = req.body.serial;
						geoData.coordinates = [req.body.lng, req.body.lat];
						newDevice.geometry = geoData;
						newDevice.address = body.results[0].formatted_address;

						newDevice.save(function(err) {
							if (err) throw err;
		
							return res.json({
								success: true,
								message: 'New device added'
							});
						});
					} else {
						return res.json({
							success: false,
							message: 'Coordinates aren\'t valid'
						});
					}
				});
				// console.log(req.body);
			}
		});
	});
}