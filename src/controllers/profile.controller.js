const User = require('../models/user')

//handle user profile view
const getProfile = async(req,res) => {
    try{
        if(req.params?.userId){
            const cookies = req.cookies;
            console.log(cookies);
            const userId = req.params?.userId;
            const profile = await User.findById(userId)
            return res.status(200).json({
                status:true,
                message:'Profile fetched successfully.',
                data:profile
            })
        } else {
            return res.status(404).json({
                status:true,
                message:"No profile found",
                data:[]
            })
            
        }
    } catch(err){
        console.error(err);
        return res.status(500).json({
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