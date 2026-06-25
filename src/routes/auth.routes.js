const express = require("express")
const authRouter = express.Router()
const {userRegister,userLogin,userLogout} = require('../controllers/auth.controller')

authRouter.post("/signup", userRegister)//Handle user registration
authRouter.post("/login",userLogin)//Handle user login
authRouter.post("/logout",userLogout)//Handle user login

module.exports = authRouter