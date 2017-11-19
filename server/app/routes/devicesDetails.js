module.exports = function(route, Device) {
    route.post('/device-detail', function(req, res) {
        var details = [];
        var noDetails = [];

        var addDetails = function(detail) {
            details.push(detail)
        };
        var addNoDetails = function(detail) {
            noDetails.push(detail)
        };

        var sendResponse = function() {
            res.json({
                'details': details,
                'noDetails': noDetails
            });
        };

        var async = 0;
        req.body.devices.forEach(function(device) {
            Device.findById(device, function(err, detail) {
                if (err) throw err;

                if (!detail) {
                    detail = {};
                    detail._id = device;
                    detail.valid = false;
                    addNoDetails(detail);
                } else {
                    var temp = {};
                    temp._id = detail._id;
                    temp.address = detail.address;
                    temp.geometry = detail.geometry;
                    temp.valid = true;
                    addDetails(temp);
                }
            }).then(function(){
                async++;
                if (async === req.body.devices.length) {
                    sendResponse();
                }
            });
        });
    });
}