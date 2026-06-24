const express = require("express")
const authRouter = express.Router()
const {userRegister,userLogin} = require('../controllers/auth.controller')

authRouter.post("/signup", userRegister)//Handle user registration
authRouter.post("/login",userLogin)//Handle user login

module.exports = authRouter