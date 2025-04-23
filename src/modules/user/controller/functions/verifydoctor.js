const User = require('../../model/user.model');
const ApiError = require('../../../../util/APIError');
const asyncHandler = require('express-async-handler');

/**
 * @desc    Verify a user (set isVerified to true)
 * @route   PATCH /verify/:id
 * @access  Private or Admin
 */
const verifyUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    if (user.isVerified) {
        return res.status(200).json({
            status: 'already verified',
            message: 'User is already verified',
        });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({
        message: 'User verified successfully',
    });
});

module.exports = verifyUser;
