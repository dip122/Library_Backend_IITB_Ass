const express = require('express');
const app = express();
const port = 2003;
const dotnev = require('dotenv');
const connectDB = require('./Config/db');
const authroutes = require('./Routers/authrouters');
const bookroutes = require('./Routers/bookrouters');
const historyrouters = require('./Routers/historyrouters');
const cors = require('cors');

dotnev.config();
connectDB();

app.get('/',(req,res)=>{
    res.send("This is server side programming language");
});

app.use(express.json());//for json data passing
app.use(express.urlencoded({extended : true}));//for FormData passing
app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
);

app.use('/api/v1/auth',authroutes);
app.use('/api/v1/book',bookroutes);
app.use('/api/v1/history',historyrouters);

app.listen(process.env.PORT || port,()=>{
    console.log(`we are listening at the port number ${port}`);
});

