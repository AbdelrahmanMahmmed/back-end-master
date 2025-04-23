const express = require('express');
const router = express.Router();


const { middlewareFunctions } = require('../../auth/controller/auth.controller');

const userController = require('../controller/user.controller');

router.get('/@:handle',
    // middlewareFunctions.ProtectedRoters, 
    userController.getUser
)

router.patch('/:id/verify-doctor',
    middlewareFunctions.ProtectedRoters, 
    middlewareFunctions.allwedTo('admin'),
    userController.verifydoctor
)

module.exports = router;