const Contact = require('../../model/contact.model');
const User = require('../../../user/model/user.model');
const ApiError = require('../../../../util/APIError');
const asyncHandler = require('express-async-handler')


/**
 * @desc    Create a new contact entry
 * @route   POST /create
 * @access  Private
 */
const createContact = asyncHandler(async (req, res) => {
    const {message} = req.body;
    const userId = req.user._id;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    // Create a new contact entry
    const contact = new Contact({
        name : user.name,
        email : user.email,
        message,
    });

    await contact.save();

    res.status(201).json({
        status: 'success',
        data: {
            contact,
        },
    });
})

module.exports = createContact;