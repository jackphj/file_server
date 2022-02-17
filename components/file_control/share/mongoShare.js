const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SchemaOption = {
    toObject: {
        virtuals: false
    },
    toJSON: {
        virtuals: false
    },
    collection: 'shares'
}

let shareSchema = new Schema({
    out_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    location: {
        type: String,
        required: true
    }
}, SchemaOption);

let shareMsg = mongoose.model('shares', shareSchema);

module.exports = shareMsg