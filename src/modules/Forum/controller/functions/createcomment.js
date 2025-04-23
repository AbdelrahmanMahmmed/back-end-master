const Forum = require('../../model/forum.model');
const ApiError = require('../../../../util/APIError');
const asyncHandler = require('express-async-handler');

/**
 * @desc    Add a comment to a forum
 * @route   POST /:id/comment
 * @access  Private
 */
const addComment = asyncHandler(async (req, res) => {
    const forumId = req.params.id;
    const userId = req.user._id;
    const { comment } = req.body;

    const forum = await Forum.findById(forumId);
    if (!forum) {
        throw new ApiError(404, 'Forum not found');
    }

    forum.comments.push({
        comment,
        user: userId
    });

    await forum.save();

    res.status(201).json({
        status: 'success',
        message: 'Comment added successfully',
        data: {
            forum
        },
    });
});

module.exports = addComment;
