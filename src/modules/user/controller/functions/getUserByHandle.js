const User = require('../../../user/model/user.model');
const asyncHandler = require('express-async-handler')
const ApiError = require('../../../../util/APIError');

/**
 * @desc    Get user by handle
 * @route   GET /:handle
 * @access  Public
 */
const getUserByHandle = asyncHandler(async (req, res) => {
    const handleParam = '@' + req.params.handle;
    const user = await User.findOne({ handle: handleParam }).select('-_id name email image');
    if (!user) {
        return res.status(404).json({ message: 'Handle is Wrong' });
    }
    res.status(200).json({ user });
});

module.exports = getUserByHandle;