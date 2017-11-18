module.exports = function(route, User, Device) {
    route.post('/add-device', function(req, res) {
        User.findById(req.body.user_id, function(err, user) {
            if (err) throw err;

            if (!user) {
                res.json({
                    success: false,
                    message: 'login failed'
                });
            } else if (user) {
                Device.findOne({
                    'serial': req.body.serial
                }, function(err, device) {
                    if (err) throw err;

                    if (!device) {
                        res.json({
                            success: false,
                            message: 'invalid serial key'
                        });
                    } else if (device) {
                        if (user.device.id.indexOf(device._id) === -1) {
                            user.device.id.push(device._id);

                            user.save(function(err) {
                                if (err) throw err;

                                if (device.user_id.indexOf(req.body.user_id) === -1) {
                                    device.user_id.push(req.body.user_id);

                                    device.save(function(err) {
                                        if (err) throw err;

                                        res.json({
                                            success: true,
                                            message: 'device added'
                                        });
                                    });
                                } else {
                                    res.json({
                                        success: true,
                                        message: 'device added'
                                    });
                                }
                            });
                        } else {
                            res.json({
                                success: false,
                                message: 'no new divice'
                            });
                        }
                    }
                });
            }
        });
    });
}