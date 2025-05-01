const Article = require('../../model/article.model');
const User = require('../../../user/model/user.model');
const ApiError = require('../../../../util/APIError');
const asyncHandler = require('express-async-handler')


/**
 * @desc    get all articles
 * @route   get /
 * @access  Private
 */
const getArticles = asyncHandler(async (req, res) => {
    const articles = await Article.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    if (!articles) {
        throw new ApiError(404, 'No articles found');
    }

    res.status(200).json({
        status: 'success',
        data: {
            articles
        },
    });
})

module.exports = getArticles;