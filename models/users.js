const { lowerCase } = require('lodash');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true, 
        lowerCase: true, 
        // validate: [isEmail, 'invalid email']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [8, 'you need to enter atleast 8 characters']
    },
})

const User = mongoose.model('User', userSchema);

module.exports = User;
module.exports = userSchema;