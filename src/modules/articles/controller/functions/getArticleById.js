const Article = require('../../model/article.model');
const User = require('../../../user/model/user.model');
const ApiError = require('../../../../util/APIError');
const asyncHandler = require('express-async-handler')


/**
 * @desc   getArticleById
 * @route   get /:id
 * @access  Private
 */
const getArticleById = asyncHandler(async (req, res , next) => {
    const { id } = req.params;
    const article = await Article.findById(id).populate('user', 'name email');
    if (!article) {
        return next(new ApiError(`No article found with id ${id}`, 404));
    }
    res.status(200).json({
        data: {
            article
        },
    });
})

module.exports = getArticleById;