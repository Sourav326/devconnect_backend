const express = require('express');
const profileRouter = express.Router()
const {getProfile,editProfile} = require('../controllers/profile.controller')
const {userAuth} = require('../middlewares/checkAuth.middlewares')

profileRouter.get('/profile/view',userAuth,getProfile)//Handle view user profile (url,middleware,function)
profileRouter.patch('/profile/edit',userAuth,editProfile)//Handle edit user profile

module.exports = profileRouter