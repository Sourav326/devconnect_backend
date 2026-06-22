const mongoose = require('mongoose')//import mongoose from node modules

//making connection with database
const connectDb = async () => {
    await mongoose.connect(process.env.DATABASE_URL)
}

//exporting the module
module.exports = connectDb
