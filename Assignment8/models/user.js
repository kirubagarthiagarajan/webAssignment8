const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 15;
//Defining the Schema for the employee
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });

});














const User = mongoose.model('User', userSchema);
module.exports = { User };