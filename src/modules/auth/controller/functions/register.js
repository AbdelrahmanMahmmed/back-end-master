const User = require('../../../user/model/user.model');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const { uploadImage } = require('../../../../util/UploadImage')

/**
 * @desc    Register user
 * @route   POST /api/v1/auth/register/user
 * @access  Public
 */
const RegisterUser = asyncHandler(async (req, res) => {

    const generatedNumber = Math.floor(100 + Math.random() * 900);

    const handle = '@' + req.body.name.toLowerCase().replace(/\s+/g, '') + generatedNumber;

    const user = new User({
        name: req.body.name,
        handle,
        email: req.body.email,
        password: req.body.password,
        role : 'user',
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: process.env.COOKIE_EXPIRES_TIME,
        sameSite: "Lax"
    });

    res.status(201).json({
        user,
        token,
    });
});

/**
 * * @desc    Register doctor
 * @route   POST /api/v1/auth/register/doctor
 * * @access  Public
 */
const RegisterDoctor = asyncHandler(async (req, res) => {

    const generatedNumber = Math.floor(100 + Math.random() * 900);

    const handle = '@' + req.body.name.toLowerCase().replace(/\s+/g, '') + generatedNumber;

    let imageUrl = '';
    if (req.file) {
        const result = await uploadImage(req.file);
        imageUrl = result.secure_url;
    }

    const user = new User({
        name: req.body.name,
        handle,
        email: req.body.email,
        password: req.body.password,
        image: imageUrl || null,
        role : 'doctor',
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: process.env.COOKIE_EXPIRES_TIME,
        sameSite: "Lax"
    });

    res.status(201).json({
        user,
        token,
    });
});

/**
 * * @desc    Register doctor
 * @route   POST /api/v1/auth/register/doctor
 * * @access  Public
 */
const RegisterAdmin = asyncHandler(async (req, res) => {

    const generatedNumber = Math.floor(100 + Math.random() * 900);

    const handle = '@' + req.body.name.toLowerCase().replace(/\s+/g, '') + generatedNumber;
    
    const user = new User({
        name: req.body.name,
        handle,
        email: req.body.email,
        password: req.body.password,
        role : 'admin',
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: process.env.COOKIE_EXPIRES_TIME,
        sameSite: "Lax"
    });

    res.status(201).json({
        user,
        token,
    });
});

module.exports = {
    RegisterUser,
    RegisterDoctor,
    RegisterAdmin,
};