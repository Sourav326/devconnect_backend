const express = require("express")
const app = express();

//handle the incomming requests
app.use('/test',(req,res) => {
    res.send("Hello from server");
})
app.listen(7080,()=>{
    console.log("Server is running succesfully....");
});