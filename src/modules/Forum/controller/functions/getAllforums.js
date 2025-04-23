const Forrm = require('../../model/forum.model');
const ApiError = require('../../../../util/APIError');
const asyncHandler = require('express-async-handler');


/**
 * @desc    Get all forums with pagination
 * @route   GET /?page=1&limit=10
 * @access  Public
 */
const getAllForums = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Forrm.countDocuments();
    const forums = await Forrm.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('user', 'name email');

    res.status(200).json({
        status: 'success',
        results: forums.length,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalForums: total,
        data: {
            forums
        },
    });
});

module.exports = getAllForums;
