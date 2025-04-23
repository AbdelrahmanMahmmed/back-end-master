const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    handle : {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    image: {
        type: String,
        default: null,
    },
    role :{
        type: String,
        enum: ['doctor', 'user' , 'admin'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    passwordResetCode: String,
    passwordResetExpiret: Date,
    passwordResetVerifed: Boolean,
    passwordChanagedAt: {
        type: Date
    },
}, { timestamps: true });

User.pre("save", async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model('User', User);