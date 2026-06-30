const ConnectionRequest = require('../models/connectionRequest')

const sendRequest = async(req,res) => {
    console.log(req.body);
    try{
        const fromUserId = req.user._id //login user (sending request from)
        const status = req.params.status //sending request to
        const toUserId = req.params.toUserId //sending request to
        const allowedStatus = ['ignored','interested']
        //check the status param should be ignored or interested only
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                status:false,
                message:"Invalid status type"
            })
        }

        //check user can't send request to yourself
        if(fromUserId == toUserId){
            return res.status(400).json({
                status:false,
                message:"You can't send connection request to yourself."
            })
        }

        //check existing request
        const isConnectionRequestExist = await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
        })
        if(isConnectionRequestExist){
            return res.status(400).json({
                status:false,
                message:"Connection request already exist."
            })
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const data  = await connectionRequest.save()
        return res.status(201).json({
            status:true,
            message:status+" request sent successfully",
            data:data
        })

    } catch(err){
        return res.status(500).json({
            status:false,
            message:err+ " Internal server error"
        })

    }

}

module.exports = {
    sendRequest
}