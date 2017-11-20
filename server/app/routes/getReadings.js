module.exports = function(route, Reading) {
    route.post('/get-readings', function(req, res) {
        Reading.find({
            'device_id': req.body.device_id
        }, function(err, readings) {
            if (err) throw err;

            if (readings.length === 0) {
                res.json({
                    success: false,
                    message: "Device is newbie"
                });
            } else {
                res.json({
                    success: true,
                    readings: readings
                });
            }
        });
    });
}