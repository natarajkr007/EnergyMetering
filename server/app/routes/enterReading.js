module.exports = function(route, Device, Reading) {
    route.post('/enter-reading', function(req, res) {
        Device.findOne({
            'serial': req.body.serial
        }, function(err, device) {
            if (err) throw err;

            if (!device) {
                res.json({
                    success: false,
                    message: 'Invalid reading entry'
                });
            } else {
                newReading = Reading();

                newReading.device_id = device._id;
                newReading.value = req.body.value;

                newReading.save(function(err) {
                    if (err) throw err;

                    return res.json({
                        success: true,
                        message: 'Reading has been read'
                    });
                });
            }
        });
    });
}