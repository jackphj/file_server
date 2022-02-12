/*
* Mongoose v5.9.2
* MongoDB v4.2.9
* this file contains all mongoDB function needed
* In this project,mongoDB is used to save accounts
* */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MongoLink = require('../config').mongoLink;

function mongoDBconnect() {
    mongoose.connect(MongoLink, {socketTimeoutMS: 6000, useUnifiedTopology: true}).then(() => {
        console.log('\033[35mMongoDB Connect Success!\033[37m');
    }).catch(err => {
        console.log('MongoDB Connect Error,Reason: ' + err);
    });
}

const SchemaOption = {
    toObject: {
        virtuals: false
    },
    toJSON: {
        virtuals: false
    },
    collection: 'users'                         //collection name: users
}

/*
* @Auth config:
*   1 : main admin (r+w create+delete user/admin(with a single space))
*   2 : admin (r+w create+delete user)
*   3 : user(read + write)
*   4 : user(read only)
* */
let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    auth: {
        type: Number,
        required: true,
        max: 4,
        min: 1
    },
    pwd: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    group: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
}, SchemaOption);

let user = mongoose.model('user', userSchema);

module.exports = {mongoDBconnect, user};