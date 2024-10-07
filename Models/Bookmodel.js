const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    author : {
        type : String,
        required : true,
    },
    Published : {
        type : Date,
    },
    content : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        default : 'available',
    }
}, {timestamps : true});

const bookmodel = mongoose.model('book',Schema);
module.exports = bookmodel;