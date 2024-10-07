const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    user : {
        type : String,
        required : true,
    },
    userid : {
        type : String,
    },
    book : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'bookmodel',
        required : true,
    },
    bookname : {
        type : String,
    },
    author : {
        type : String,
    },
    message : {
        type : String,
        required : true,
    }
}, { timestamps : true });

const history = mongoose.model('history',Schema);
module.exports = history;