const jwt = require('jsonwebtoken');

const GenerateToken = async(id)=>{
    const token = await jwt.sign({id}, process.env.SECRET_KEY, {expiresIn : "7d"});
    return token;
}

const VerifyToken = async(token)=>{
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    return decode;
}

module.exports = {GenerateToken , VerifyToken};