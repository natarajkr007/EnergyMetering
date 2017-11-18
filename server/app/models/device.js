var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var geoSchema = require('./geoSchema.js');

var deviceSchema = new Schema({
    user_id: {
        type: [Schema.Types.ObjectId]
    },
    serial: {
        type: String,
        required: true
    },
    geometry: geoSchema
});

module.exports = mongoose.model('Device', deviceSchema);
