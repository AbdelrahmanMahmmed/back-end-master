const Forrm = require('../../model/forum.model');
const User = require('../../../user/model/user.model');
const ApiError = require('../../../../util/APIError');
const asyncHandler = require('express-async-handler');

/**
 * @desc    Delete a forum
 * @route   DELETE /delete/:id
 * @access  Private
 */
const deleteForum = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const forumId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const forum = await Forrm.findById(forumId);
    if (!forum) {
        throw new ApiError(404, 'Forum not found');
    }

    if (forum.user.toString() !== userId.toString()) {
        throw new ApiError(403, 'You are not allowed to delete this forum');
    }

    await forum.deleteOne();

    res.status(200).json({
        status: 'success',
        message: 'Forum deleted successfully',
    });
});

module.exports = deleteForum;
