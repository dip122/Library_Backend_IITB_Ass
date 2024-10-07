const express = require('express');
const router = express.Router();

const AuthController = require('../Controller/AuthController');
const { requireSignInAsLibraian } = require('../Middlewares/AuthMiddlewares');


router.post('/register',AuthController.registercontroller);
router.post('/login',AuthController.logincontroller);
router.put('/deleteuser/:id',AuthController.deleteAccountController);
router.get('/getallusersactive',requireSignInAsLibraian,AuthController.getAllUsersControllerActive);
router.get('/getallusersdeleted',requireSignInAsLibraian,AuthController.getAllUsersControllerdeleted);

module.exports = router;
