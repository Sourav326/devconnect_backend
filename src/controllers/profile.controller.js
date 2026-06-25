const User = require('../models/user')
const jwt = require('jsonwebtoken')

//handle user profile view
const getProfile = async(req,res) => {
    try{
        const profile = req.user;
        return res.status(200).json({
            status:true,
            message:'Profile fetched successfully.',
            data:profile
        })
    } catch(err){
        console.error(err);
        return res.status(500).json({
            status:false,
            message:err.message
        })
    }
}


const editProfile = async(req,res) => {
    try{
        //extract all fields
        const {
            firstName,
            lastName,
            dob,
            profilePictures,
            gender,
            interestedIn,
            lookingFor,
            interests,
            location,
            occupation,
            height,
            bio
        } = req.body;//from request by user

        const loggedInUser = req.user;//from middleware

        Object.keys(req.body).forEach((key) => {loggedInUser[key] = req.body[key]})
        await loggedInUser.save()

        // const updatedUser = await User.findByIdAndUpdate(_id,{
        //     firstName,
        //     lastName,
        //     dob,
        //     profilePictures,
        //     gender,
        //     interestedIn,
        //     lookingFor,
        //     interests,
        //     location,
        //     occupation,
        //     height,
        //     bio
        // }
        // ).select("-password -email -mobile");
        // if (!updatedUser) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "User not found"
        //     });
        // }

        return res.status(200).json({
            success: true,
            message: req.user.firstName+" profile updated successfully",
            data: loggedInUser
        });
    }catch(err){
        return res.status(500).json({
            status:false,
            message:"Internal server error"
        })
    }
}

module.exports = {
    getProfile,
    editProfile
}