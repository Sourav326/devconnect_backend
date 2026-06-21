const mongoose = require('mongoose')//import mongoose from node modules

//making connection with database
const connectDb = async () => {
    await mongoose.connect("mongodb+srv://souravchauhan1964_db_user:zLiIFVm8iS1ridNE@nodejs.n2yvme4.mongodb.net/devConnect")
}

//exporting the module
module.exports = connectDb
