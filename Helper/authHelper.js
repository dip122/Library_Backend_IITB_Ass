const bcrypt = require('bcrypt');


const hashpassword = async(password)=>{
    try{
        const saltrounds = 10;
        const hashedpassword = await bcrypt.hash(password,saltrounds);
        return hashedpassword;
    }catch(error){
        console.log("Password hashing incorrect");
        console.log(error);
    }
};

const comparepassword = async(password,hashedpassword)=>{
    try{
        const isMatch = await bcrypt.compare(password,hashedpassword);
        if(isMatch){
            return true;
        }
        return false;
    }catch(error){
        console.log(error);
        return false;
    }
}

module.exports = {hashpassword,comparepassword};