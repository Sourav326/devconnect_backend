const User = require('../models/user')

//Handle getting feeds
const getAllFeeds = async(req,res) => {
    try{
        const feeds = await User.find({}).select(
            "-password -email -mobile"//the fields we dont need in the response
        );//find all documents
        if(feeds.length > 0){
            return res.status(200).json({
                success: true,
                message: "Feeds fetched successfully",
                data: feeds
            });
        } else {
            return res.status(404).json({
                success:true,
                message:"No feeds available",
                data:[]
            })
        }
    } catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })

    }
}

module.exports = {
    getAllFeeds
}