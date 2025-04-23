const Forrm = require('../../model/forum.model');
const User = require('../../../user/model/user.model');
const ApiError = require('../../../../util/APIError');
const asyncHandler = require('express-async-handler');

/**
 * @desc    Update an existing forum
 * @route   PUT /update/:id
 * @access  Private
 */
const updateForum = asyncHandler(async (req, res) => {
    const { context } = req.body;
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
        throw new ApiError(403, 'You are not allowed to update this forum');
    }

    forum.context = context || forum.context;
    await forum.save();

    res.status(200).json({
        status: 'success',
        data: {
            forum
        },
    });
});

module.exports = updateForum;
