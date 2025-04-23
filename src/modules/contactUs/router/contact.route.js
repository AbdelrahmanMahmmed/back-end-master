const express = require('express');
const router = express.Router();

const {
    CreateContactValidator
} = require('../validator/contact.validator');

const { middlewareFunctions } = require('../../auth/controller/auth.controller');


const contactController = require('../controller/contact.controller');

router.post('/create', 
    middlewareFunctions.ProtectedRoters,
    CreateContactValidator,
    contactController.createContact
);

module.exports = router;