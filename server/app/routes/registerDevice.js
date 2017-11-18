var geoData = require('../models/geoSchema.js');

module.exports = function(route, Device) {
	route.post('/register-device', function(req, res) {
		Device.findOne({
			'serial': req.body.serial
		}, function(err, device) {
			if (err) throw err;

			if (device) {
				res.json({
					success: false,
					message: 'The device is already register. Check the serial key.'
				});
			} else {
				var newDevice = Device();

				newDevice.serial = req.body.serial;
				geoData.coordinates = [req.body.lng, req.body.lat]
				newDevice.geometry = geoData;

				newDevice.save(function(err) {
					if (err) throw err;

					return res.json({
						success: true,
						message: 'New device added'
					});
				});
				// console.log(req.body);
			}
		});
	});
}