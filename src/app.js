const express = require("express")//import express from node modules
const app = express();
const connectDb = require("./config/dbConfig")//import database connection module
require("dotenv").config();
const cookieParser = require('cookie-parser') 


app.use(express.json())//middleware for converting the json to javascript object for every API
app.use(cookieParser())//for reading the cookies

const authRouter = require('./routes/auth.routes')
const profileRouter = require('./routes/profile.routes')
const userRouter = require('./routes/user.routes')


//routes START *****************

app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',userRouter)

//routes END ********************


connectDb().then(() => {//first connect to database
    console.log("Database connected successfully");
    app.listen(process.env.PORT,()=>{//secondly start the server after DB connected sucessfully
        console.log("Server is running succesfully....");
    });
}).catch(err => {//if database not connected successfully
    console.error("Database connection failed");
})



