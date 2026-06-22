const User = require('../models/user')
const {validateSignupData} = require('../utils/validation')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//Handle user registration
const userRegister = async (req,res) => {
    try{
        //validation of data
        validateSignupData(req);

        //extract all fields
        const {
            firstName,
            lastName,
            email,
            password,
            mobile,
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

        //check is email already exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        //encrypt the password
        const passwordHash = await bcrypt.hash(password,10);

        //save the user
        const user = new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
            mobile,
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
        })//creating instance of user model
        await user.save()
        return res.status(201).json({//201 for creating a resource
            success:true,
            message:"User created Successfully"
        })
    } catch(err){
        console.error(err);
        return res.status(500).json({
            message:err.message
        })
    }

}

//Handle user login
const userLogin = async (req,res) => {
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({
                status:false,
                message:"Email and password is required."
            })
        }
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(401).json({
                status:false,
                message:"Invalid Credentials"
            })
        } else {
            const isValidUser = await bcrypt.compare(password,user.password)
            if(isValidUser){
                const token = jwt.sign({_id:user._id},"Devconnect@4efgrrggtt")//data to hide,secret key
                res.cookie("token",token)
                return res.status(200).json({
                    status:true,
                    message:"Login Successfully."
                })
            } else {
                return res.status(401).json({
                    status:false,
                    message:"Invalid Credentials"
                })

            }
        }
    } catch(err){
        console.error(err);
        return res.status(500).json({
            message:err.message
        })
    }
}


//Handle user logout

module.exports = {
    userRegister,
    userLogin
}