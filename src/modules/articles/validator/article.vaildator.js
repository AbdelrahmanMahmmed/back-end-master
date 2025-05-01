const { body } = require('express-validator');
const validatorsMiddleware = require('../../../middleware/validatormiddleware');

exports.CreateArticleValidator = [
    body("title")
        .notEmpty()
        .withMessage('title is required')
    ,
    body("description")
        .notEmpty()
        .withMessage('description is required')
    ,
    validatorsMiddleware,
];

exports.updatedArticleValidator = [
    body("title")
        .optional()
    ,
    body("description")
        .optional()
    ,
    validatorsMiddleware,
];