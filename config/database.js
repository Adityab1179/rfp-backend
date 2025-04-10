const mongoose=require('mongoose')
require('dotenv').config()
const databaseConnection=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database Connected")
    } catch (error) {
        console.log("Database Not Connected")
    }
}
module.exports=databaseConnection