const bookmodel = require('../Models/Bookmodel');
const historymodel = require('../Models/history');
const mongoose = require('mongoose');

class BookController {

    static addBookController = async(req,res)=>{
        try{
            const {name , author , published , content } = req.body;
            if(!name || !author || !content){
                return res.status(200).send({
                    success : false,
                    message : "please enter the name , author and content atleast"
                })
            }
            const book = new bookmodel({
                name : name,
                author : author,
                content : content,
                published : published
            });

            const savedbook = await bookmodel.insertMany([book]);
            return res.status(201).send({
                success : true,
                message : "book saved successfully",
                book : savedbook
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "server side error in case of addBookController",
                error
            })
        }
    }

    static removeBookController = async(req,res)=>{
        try{
            const id = req.params.id;
            const book = await bookmodel.findById(id);
            if(!book){
                return res.status(200).send({
                    success : false,
                    message : "book is already removed by another libraian , refresh the page"
                })
            }
            const removedbook = await bookmodel.findByIdAndDelete(id);
            return res.status(200).send({
                success : true,
                message : "book removed successfully",
                book : removedbook
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "Server side error in case of removebookController",
                error
            })
        }
    }

    static updateBookController = async(req,res)=>{
        try{
            const bookid = req.params.id;
            const updateData = req.body;

            console.log(updateData);

            const updatebook = await bookmodel.findByIdAndUpdate(bookid, updateData , {
                new : true,
            });

            if(!updatebook){
                return res.status(400).send({
                    success : false,
                    message : "Book Not updated successfully"
                })
            }

            return res.status(200).send({
                success : true,
                message : "book updated successfully",
                book : updatebook
            })

        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "Server side error in case of updatebookcontroller",
                error
            })
        }
    }

    static getallBooksController = async(req,res)=>{
        try{
            const getallbooks = await bookmodel.find({});
            return res.status(200).send({
                success : true,
                message : "Successfully received all books",
                books :  getallbooks
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "Server side error in case of getallBooksController",
                error
            })
        }
    }

    static borrowBookController = async(req,res)=>{
        try{
            const user = req.user;
            const bookid = req.params.id;
            const book = await bookmodel.findById(bookid);
            if(book.status === 'borrowed'){
                return res.status(200).send({
                    success : false,
                    message : "Book is not Available"
                })
            }
            const updatestatusbook = await bookmodel.findByIdAndUpdate(bookid , { status : 'borrowed'}, {
                new : true,
                runValidators : true,
            });
            const addhistory = new historymodel({
                user : user.name,
                userid : user._id,
                book : updatestatusbook._id,
                bookname : updatestatusbook.name,
                author : updatestatusbook.author,
                message : 'book_borrowed'
            })

            const savedhistory = await historymodel.insertMany([addhistory]);
            if(!savedhistory){
                return res.status(200).send({
                    success : true,
                    message : "history is not saved",
                });
            }
            return res.status(200).send({
                success : true,
                message : "Server side error in case of borrowBookController",
                book : updatestatusbook
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "Server side error in case of borrowBookController",
                error
            })
        }
    }

    static returnBookController = async(req,res)=>{
        try{
            const bookid = req.params.id;
            const user  = req.user;
            const updatedbook = await bookmodel.findByIdAndUpdate(bookid , { status : 'available' }, {
                new : true,
            });
            const bookObjectId = new mongoose.Types.ObjectId(bookid);

            const history = await historymodel.findOne({book : bookObjectId , message : 'book_borrowed'});
            const historyid = history._id;

            const savedhistory = await historymodel.findByIdAndUpdate(historyid , {
                message : 'book_returned'
            }, { new : true });
            // console.log(bookid , savedhistory);
            if(!savedhistory){
                return res.status(200).send({
                    success : true,
                    message : "history is not saved",
                });
            }

            return res.status(200).send({
                success : true,
                message : "Book returned successfully",
                book : updatedbook
            });
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : true,
                message : "server side error in case of returnBookController",
                error
            })
        }
    }

}

module.exports = BookController;