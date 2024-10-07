const express = require('express'); 
const router = express.Router();
const {requireSignInAsLibraian , requireSignInAsstudent} = require('../Middlewares/AuthMiddlewares');
const BookController = require('../Controller/BookController');

router.post('/addbook',requireSignInAsLibraian,BookController.addBookController);
router.delete('/removebook/:id',requireSignInAsLibraian,BookController.removeBookController);
router.put('/updatebooks/:id',requireSignInAsLibraian,BookController.updateBookController);
router.get('/getallbooks',BookController.getallBooksController);
router.put('/borrowbook/:id',requireSignInAsstudent,BookController.borrowBookController);
router.put('/returnbook/:id',requireSignInAsstudent,BookController.returnBookController);

module.exports = router;