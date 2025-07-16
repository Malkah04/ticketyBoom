const mongoose =require("mongoose");


//connections to database
function connectDB(){
    try{
        mongoose.connect(process.env.ATLAS_URL)
        console.log("connected to mongodb .. ")

    }catch(err){
        console.log("connection failed " ,err)
    }
}

module.exports = connectDB;