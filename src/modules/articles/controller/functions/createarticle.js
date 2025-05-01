const Article = require('../../model/article.model');
const User = require('../../../user/model/user.model');
const ApiError = require('../../../../util/APIError');
const asyncHandler = require('express-async-handler')


/**
 * @desc    Create a new contact entry
 * @route   POST /create
 * @access  Private
 */
const createArticle = asyncHandler(async (req, res) => {
    const {title , description} = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    if(user.isVerified === false && user.role === 'doctor') {
        throw new ApiError(403, 'Doctor not verified');
    }

    const article = new Article({
        user : userId,
        title, 
        description
    });

    await article.save();

    // Add the article to the user's articles array
    user.articles.push(article._id);
    await user.save();

    res.status(201).json({
        status: 'success',
        data: {
            article
        },
    });
})

module.exports = createArticle;