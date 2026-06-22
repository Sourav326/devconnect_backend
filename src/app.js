const express = require("express")//import express from node modules
const app = express();
const connectDb = require("./config/dbConfig")//import database connection module
require("dotenv").config();
const {userRegister} = require('./controllers/auth.controller')
const {getAllFeeds} = require('./controllers/user.controller')
const {getProfile,editProfile} = require('./controllers/profile.controller')

//middleware for converting the json to javascript object for every API
app.use(express.json())


//routes START *****************

app.post("/signup", userRegister)//Handle user registration
app.get("/feeds", getAllFeeds)//Handle getting feeds
app.get('/profile/view/:userId',getProfile)//Handle view user profile
app.patch('/profile/edit',editProfile)//Handle edit user profile

//routes END ********************


connectDb().then(() => {//first connect to database
    console.log("Database connected successfully");
    app.listen(process.env.PORT,()=>{//secondly start the server after DB connected sucessfully
        console.log("Server is running succesfully....");
    });
}).catch(err => {//if database not connected successfully
    console.error("Database connection failed");
})



