const express = require('express');
const router = express.Router();

const {
    RegisterUserValidator,
    RegisterDoctorValidator,
    LoginUserValidator,
} = require('../validator/auth.validator');

const { upload } = require('../../../util/UploadImage');


const authController = require('../../auth/controller/auth.controller');


router.post('/register/user', RegisterUserValidator, authController.register.RegisterUser);
router.post('/register/doctor', upload.single('image'),RegisterDoctorValidator, authController.register.RegisterDoctor);
router.post('/register/admin', RegisterUserValidator, authController.register.RegisterAdmin);

router.post('/login', 
    LoginUserValidator, 
    authController.login
);


router
    .route('/forget-password')
    .post(    
        authController.forgotpassword.ForgetPassword
    );

router
    .route('/verify/password-reset-code')
    .post(authController.forgotpassword.verifycode);
router
    .route('/reset-password')
    .post(authController.forgotpassword.Resetpassword);

module.exports = router;