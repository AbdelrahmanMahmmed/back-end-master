const DailyMessage = require('../../model/notification.model');
const asyncHandler = require('express-async-handler');

/**
 * @desc    Get all daily messages (notifications)
 * @route   GET /daily-messages
 * @access  Private
 */
const getAllDailyMessages = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalMessages = await DailyMessage.countDocuments();
    const messages = await DailyMessage.find()
        .sort({ sentAt: -1 })
        .skip(skip)
        .limit(limit);

    res.status(200).json({
        status: 'success',
        results: messages.length,
        total: totalMessages,
        page,
        totalPages: Math.ceil(totalMessages / limit),
        data: {
            messages
        },
    });
});

module.exports = getAllDailyMessages;
