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
    status : {
        type : String,
        default : "active"
    },
    role : {
        type : String,
        default : "student"
    }
}, {timestamps : true});

const usermodel = mongoose.model('user',Schema);
module.exports = usermodel;