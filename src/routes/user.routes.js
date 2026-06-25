const express = require('express')
const userRouter = express.Router()
const {getAllFeeds} = require('../controllers/user.controller')

userRouter.get("/feeds", getAllFeeds)//Handle getting feeds(url,function)

module.exports = userRouter