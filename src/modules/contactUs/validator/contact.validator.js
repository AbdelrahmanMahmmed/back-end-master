const { body } = require('express-validator');
const validatorsMiddleware = require('../../../middleware/validatormiddleware');


exports.CreateContactValidator = [
    body("massage")
        .notEmpty()
        .withMessage('massage is required')
    ,
    validatorsMiddleware,
];