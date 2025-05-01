const Article = require('../../model/article.model');
const User = require('../../../user/model/user.model');
const ApiError = require('../../../../util/APIError');
const asyncHandler = require('express-async-handler')


/**
 * @desc    delete article
 * @route   DELETE /:id
 * @access  Private
 */
const deleteArticle = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const article = await Article.findById(id).populate('user', 'name email role');
    if (!article) {
        return next(new ApiError(`No article found with id ${id}`, 404));
    }
    if (article.user._id.toString() !== req.user.id) {
        return next(new ApiError('You are not authorized to delete this article', 403));
    }
    await article.deleteOne();
    await User.findByIdAndUpdate(req.user.id, { $pull: { articles: id } });
    res.status(200).json({
        status: 'success',
        message: 'Article deleted successfully',
    });
})

module.exports = deleteArticle;