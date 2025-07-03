const mongoose =require('mongoose')

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true,
        mixLength: 200,
        minLength :3,
        trim: true
    },
    email:{
        type:String ,
        required :true,
        trim: true,
        unique : true,
    },
    password:{
        type:String,
        required :true,
        minLength :8,
    },
    role:{
        type:String,
        required:true,
        enum:[
            "organizer",
            "admin",
            "user"
        ],
    }

},{
    timeStamps:true
})

const User =mongoose.model("User" ,userSchema)

module.exports ={
    User
}