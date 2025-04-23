const express = require('express');
const router = express.Router();



const { middlewareFunctions } = require('../../auth/controller/auth.controller');


const notificationController = require('../controller/notification.controller');

router.get('/', 
    middlewareFunctions.ProtectedRoters,
    notificationController.getAllNotifications
);

module.exports = router;