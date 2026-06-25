const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userAuth = async (req,res,next) => {
    try{
        const {token} = req.cookies;//read the token
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login"
            });
        }
        const decodedObject = await jwt.verify(token, process.env.JWT_SECRET);
        const {_id} = decodedObject;
        const user = await User.findById(_id).select("-password -email -mobile -isVerified -isActive -lastSeen -createdAt -updatedAt -__v")
        if(!user){
            throw new Error('User not available')
        }
        req.user = user;
        next()
        
    } catch(err){
        return res.status(500).json({
            status:flase,
            message:"Internal Server error"
        })
    }
}
// ***************************** Middleware END ******************************************

module.exports = {
    userAuth
}