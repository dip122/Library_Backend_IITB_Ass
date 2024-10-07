const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please validate my email address")
            }
        }
    },
    password : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    contact : {
        type : String,
        required : true,
    },
    department : {
        type : String,
    },
    role : {
        type : String,
        default : "student"
    }
}, {timestamps : true});

const usermodel = mongoose.model('user',Schema);
module.exports = usermodel;