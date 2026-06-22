const User = require('../models/user')
const {validateSignupData} = require('../utils/validation')
const bcrypt = require('bcrypt');

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


//Handle user logout

module.exports = {
    userRegister
}