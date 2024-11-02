const { hash } = require('bcrypt');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required, please input name!'],
        unique: true
    },
    image: {
        type: String,
        required: [true, 'Image is required, please upload your picture!'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, 
        lowercase: true, 
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
    },
    accountNumber: {
        type: Number,
        required: [true, 'Account number is required, please fill out the credentials'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  { timestamps: true }
);

    // userSchema.pre('save', async function(next) {
    //     const user = this;
    //     if (!user.isModified('password')) return next();

    //     try {
    //         const salt = await bcrypt.genSalt();
    //         user.password = await bcrypt.hash(user.password, salt);
    //         next();
    //     } catch (err) {
    //         next(err);
    //     }
    // });

    userSchema.methods.comparePassword = async function(password) {
        return bcrypt.compare(password, this.password);
    }

const User = mongoose.model('User', userSchema); 

module.exports = User; 
