const { body } = require('express-validator');
const validatorsMiddleware = require('../../../middleware/validatormiddleware');


exports.CreateForumValidator = [
    body("context")
        .notEmpty()
        .withMessage('context is required')
    ,
    validatorsMiddleware,
];