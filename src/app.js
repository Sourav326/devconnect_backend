const express = require("express")//import express from node modules
const connectDb = require("./config/database")//import database connection module
const app = express();

const User = require('./models/user')

//middleware for converting the json to javascript object for every API
app.use(express.json())


//API for handling signup START **********************
app.post("/signup", async (req,res) => {
    const user = new User(req.body)//creating instance of user model
    try{
        await user.save()
        res.status(200).json({
            success:true,
            message:"User created Successfully"
        })
    } catch(err){
        res.status(500).json({
            message:"Internal server error"
        })
    }
})
//API for handling signup END ***********************


//API for handling feeds START **********************
app.get("/feeds",async(req,res) => {
    try{
        const feeds = await User.find({}).select(
            "-password -email -mobile"//the fields we dont need in the response
        );;//find all documents
        if(feeds.length > 0){
            res.status(200).json({
                success: true,
                message: "Feeds fetched successfully",
                data: feeds
            });
        } else {
            res.status(404).json({
                success:true,
                message:"No feeds available",
                data:[]
            })
        }
    } catch(err){
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })

    }
})
//API for handling feeds END ************************


connectDb().then(() => {//first connect to database
    console.log("Database connected successfully");
    app.listen(7080,()=>{//secondly start the server after DB connected sucessfully
        console.log("Server is running succesfully....");
    });
}).catch(err => {//if database not connected successfully
    console.error("Database connection failed");
})



