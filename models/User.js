/**
 * Model of User Class.
 * 
 */

const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = User = Mongoose.model('User', UserSchema);
