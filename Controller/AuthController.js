const usermodel = require("../Models/Usermodel");
const {hashpassword,comparepassword} = require("../Helper/authHelper");
const { GenerateToken } = require("../Config/Token");


class AuthController {

    static registercontroller = async(req,res)=>{
        try{
            const {name , email , password, address , contact , department ,role } = req.body;
            if(!name || !email || !password || !address || !contact || !role){
                return res.status(404).send({
                    success : false,
                    message : "ALl the fields are not available properly"
                })
            }

            const user = await usermodel.findOne({email : email});
            if(user){
                return res.status(200).send({
                    success : false,
                    message : "User do exists"
                })
            }

            const hashedpassword = await hashpassword(password);
            const newuser = new usermodel({
                name : name,
                email : email,
                password : hashedpassword,
                address : address,
                contact : contact,
                role : role
            });
            const saveduser = await usermodel.insertMany([newuser]);
            return res.status(201).send({
                success : true,
                message : "User registered successfully",
                user : {
                    name : name,
                    email : email,
                    address : address,
                    contact : contact,
                    role : role
                }
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "registered successfully",
                error
            })
        }
    }

    static logincontroller = async(req,res)=>{
        try{
            const {email , password } = req.body;
            if(!email || !password){
                return res.status(200).send({
                    success : false,
                    message : "Email and password not received properly",
                })
            }
            const user = await usermodel.findOne({email : email });
            if(!user){
                return res.status(404).send({
                    success : false,
                    message : "User Do not Exist",
                })
            }
            const hashedpassword = user.password;
            const compare= await comparepassword(password,hashedpassword);
            if(compare === false){
                return res.status(200).send({
                    success : true,
                    message : "Password Do Not match"
                })
            }

            const Token = await GenerateToken(user._id);
            if(!Token){
                return res.status(200).send({
                    success : false,
                    message : "Token not generated properly",
                })
            }

            return res.status(200).send({
                success : true,
                message : "LoginController successful",
                user : {
                    name : user.name,
                    email : user.email,
                    address : user.address,
                    contact : user.contact,
                    role : user.role
                },
                Token
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "Server side error in case of loginctroller",
                error
            })
        }
    }

    static deleteAccountController = async(req,res)=>{
        try{
            const id = req.params.id;
            const user = await usermodel.findById(id);
            if(!user){
                return res.status(200).send({
                    success : false,
                    message : "User do not exist",
                })
            }

            const deleteduser = await usermodel.findByIdAndDelete(id);
            return res.status(200).send({
                success : true,
                message : "user deleted successfully",
                user : deleteduser
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "server side error in case of deleteAccountController",
                error
            })
        }
    }
}

module.exports = AuthController;
