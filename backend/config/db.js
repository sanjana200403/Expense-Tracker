const mongoose = require('mongoose');
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI ,{});
        console.log("MONGODB connected");
    }catch(err){
       console.log("Error connecting to MongoDb",err);
       process.exit(1);
    }
}
module.exports = connectDB;