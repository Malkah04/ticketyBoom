const mongoose = require("mongoose")

const FavSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    ticketId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Ticket',
        required:true,
    }],
},
{timestamps:true})

const Favourite =mongoose.model("Favourite" ,FavSchema)

module.exports ={Favourite}
