const express = require('express');
const router = express.Router();
const HistoryController = require('../Controller/historycontroller');
const {requireSignInAsLibraian, requireSignInAsstudent} = require('../Middlewares/AuthMiddlewares');

router.get('/getallhistory/:id',requireSignInAsLibraian, HistoryController.gethistorycontroller);
router.get('/getallhistoryborrowed/:id', requireSignInAsstudent, HistoryController.getalluserhistoryborrowedcontroller);


module.exports = router;