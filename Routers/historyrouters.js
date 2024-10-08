const express = require('express');
const router = express.Router();
const HistoryController = require('../Controller/historycontroller');
const {requireSignInAsLibraian, requireSignInAsstudent} = require('../Middlewares/AuthMiddlewares');

router.get('/getallstudenthistory',requireSignInAsstudent, HistoryController.gethistorycontrollerforuser);
router.get('/getallhistoryborrowed', requireSignInAsLibraian, HistoryController.getalluserhistoryborrowedcontroller);


module.exports = router;