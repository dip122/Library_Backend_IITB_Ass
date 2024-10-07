const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL,{
        });
        console.log("MongoDB successfully connected");
        console.log(`MongoDB is running at the port number ${conn.connection.port}`);
    }catch(error){
        console.log("There is some error in connecting to mongodb");
        console.log(error);
    }
}

module.exports = connectDB;