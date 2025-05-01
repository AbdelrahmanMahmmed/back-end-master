const Contact = require('../../model/contact.model');
const User = require('../../../user/model/user.model');
const ApiError = require('../../../../util/APIError');
const asyncHandler = require('express-async-handler')


/**
 * @desc    Get all contact entries
 * @route   GET /getall
 * @access  Private
 */
const getallContacts = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    // Get all contact entries
    const contacts = await Contact.find({});

    res.status(200).json({
        status: 'success',
        data: {
            contacts,
        },
    });
})

module.exports = getallContacts;