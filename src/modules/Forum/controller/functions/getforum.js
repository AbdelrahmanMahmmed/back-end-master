const Forrm = require('../../model/forum.model');
const ApiError = require('../../../../util/APIError');
const asyncHandler = require('express-async-handler');

/**
 * @desc    Get a single forum by ID
 * @route   GET /:id
 * @access  Public
 */
const getSingleForum = asyncHandler(async (req, res) => {
    const forumId = req.params.id;

    const forum = await Forrm.findById(forumId).populate('user', 'name email');

    if (!forum) {
        throw new ApiError(404, 'Forum not found');
    }

    res.status(200).json({
        status: 'success',
        data: {
            forum
        },
    });
});

module.exports = getSingleForum;
