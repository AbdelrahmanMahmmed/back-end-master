const Forrm = require('../../model/forum.model');
const User = require('../../../user/model/user.model');
const ApiError = require('../../../../util/APIError');
const asyncHandler = require('express-async-handler')


/**
 * @desc    Create a new contact entry
 * @route   POST /create
 * @access  Private
 */
const createForum = asyncHandler(async (req, res) => {
    const { context } = req.body;
    const userId = req.user._id;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    if (user.isVerified === false && user.role === 'doctor') {
        throw new ApiError(403, 'You are not allowed to create a forum until you are verified');
    }

    // Create a new contact entry
    const forrm = new Forrm({
        context,
        user: userId,
    });

    await forrm.save();

    res.status(201).json({
        status: 'success',
        data: {
            forrm
        },
    });
})

module.exports = createForum;