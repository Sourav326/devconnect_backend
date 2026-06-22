const mongoose = require('mongoose')//import mongoose from node modules
const userSchema = new mongoose.Schema({//create mongoose schema
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    mobile: {
        type: String,
        unique: true,
        sparse: true,
    },
    dob:{
        type:Date
    },
    profilePictures: [
        {
          type: String, // image URL
        },
    ],
    gender: {
        type: String,
        enum: ["male", "female", "other"],
    },
    interestedIn: [
        {
          type: String,
          enum: ["male", "female", "other"],
        },
    ],
    lookingFor: {
        type: String,
        enum: [
          "friendship",
          "collaboration",
          "networking",
        ],
    },
    interests: [
        {
            type: String,
        },
    ],
    location: {
        city: String,
        state: String,
        country: String,
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    },
    occupation: String,
    
    height: Number,
    
    lastSeen: {
        type: Date,
        default: Date.now
    },
    bio: {
        type: String,
        maxlength: 500,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("User",userSchema);