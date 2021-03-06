var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var readingSchema = new Schema({
    device_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Reading', readingSchema);
