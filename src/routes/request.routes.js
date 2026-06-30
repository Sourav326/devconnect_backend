const express = require('express')
const requestRouter = express.Router()
const {userAuth} = require('../middlewares/checkAuth.middlewares')
const {sendRequest} = require('../controllers/request.controller')

requestRouter.post('/request/send/:status/:toUserId',userAuth,sendRequest)


module.exports = requestRouter