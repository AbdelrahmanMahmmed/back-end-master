const Article = require('../../model/article.model');
const User = require('../../../user/model/user.model');
const ApiError = require('../../../../util/APIError');
const asyncHandler = require('express-async-handler')


/**
 * @desc    Update an article
 * @route   PUT /
 * @access  Private
 */
const updatedArticle = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    // Check if the article exists
    const article = await Article.findById(id);
    if (!article) {
        throw new ApiError('Article not found', 404);
    }

    // Check if the user is the author of the article
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError('User not found', 404);
    }

    if (article.user.toString() !== user._id.toString()) {
        throw new ApiError('You are not authorized to update this article', 403);
    }
    
    

    // Update the article
    article.title = title || article.title;
    article.description = description || article.description;
    article.updatedAt = Date.now();

    await article.save();

    res.status(200).json({
        success: true,
        message: 'Article updated successfully',
    });
})

module.exports = updatedArticle;