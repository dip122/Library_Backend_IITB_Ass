const express = require('express');
const router = express.Router();
const HistoryController = require('../Controller/historycontroller');
const {requireSignInAsLibraian} = require('../Middlewares/AuthMiddlewares');

router.get('/getallhistory/:id',requireSignInAsLibraian, HistoryController.gethistorycontroller);


module.exports = router;