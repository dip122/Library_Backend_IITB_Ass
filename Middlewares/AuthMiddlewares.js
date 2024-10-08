const { VerifyToken } = require("../Config/Token");
const usermodel = require("../Models/Usermodel");

const requireSignInAsstudent = async(req,res,next)=>{
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.status(400).send({
                success : false,
                message : "Token not received"
            })
        }
        const decode = await VerifyToken(token);
        const finduser = await usermodel.findById(decode.id).select('-password');
        if(finduser.role === 'Libraian'){
            return res.status(400).send({
                success : false,
                message : "Only student can enter"
            })
        }
        req.user = finduser;
        next();
    }catch(error){
        console.log(error);
        return res.status(400).send({
            success : false,
            message : "Server side error in case of requireSignInAsstudent middleware",
            error
        })
    }
}

const requireSignInAsLibraian = async(req,res,next)=>{
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.status(400).send({
                success : false,
                message : "Token not received properly"
            })
        }
        const decode = await VerifyToken(token);
        const finduser = await usermodel.findById(decode.id).select('-password');
        if(finduser.role === 'student'){
            return res.status(400).send({
                success : false,
                message : "Only Libraian can enter"
            })
        }
        req.user = finduser;
        next();
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of requireSignInAsLibraian middleware",
            error
        })
    }
}

const requireSignIn = async(req,res,next)=>{
    try{
        const token = req.headers.authorization;

        if(!token){
            return res.status(401).send({
                success : false,
                message : "token not received"
            })       
        }
        const decode = await VerifyToken(token);
        const finduser = await usermodel.findById(decode.id);
        req.user = finduser;
        next();
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Server side error in case of requireSignIn Middleware",
            error
        })
    }
}

module.exports = {requireSignInAsLibraian, requireSignInAsstudent , requireSignIn}