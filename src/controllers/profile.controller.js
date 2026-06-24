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
            userId,
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
        } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id is required"
            });
        }
        const updatedUser = await User.findByIdAndUpdate(userId,{
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
        },
        {
            new: true
        }
        ).select("-password -email -mobile");
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser
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