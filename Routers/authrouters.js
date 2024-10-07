const express = require('express');
const router = express.Router();

const AuthController = require('../Controller/AuthController');


router.post('/register',AuthController.registercontroller);
router.post('/login',AuthController.logincontroller);
router.delete('/deleteuser/:id',AuthController.deleteAccountController);

module.exports = router;
