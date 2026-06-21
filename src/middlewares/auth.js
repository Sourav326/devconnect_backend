//handle Admin Auth Middleware for all HTTP methods GET, POST ....... ************************
const adminAuth = (req,res,next) => {
    try{
        console.log("called middleware....")
        const token = "xyz";
        const isAutheorized = token === "xyz"
        if(!isAutheorized){
            res.status(401).send("Unauthorized Access")
        } else {
            next() 
        }
    } catch(err){
        res.status(500).send('some error contact suport team')
    }
}
// ***************************** Middleware END ******************************************

module.exports = {
    adminAuth
}