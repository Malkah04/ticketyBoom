const mongoose =require("mongoose")

const cartShema =new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    tickets:[
        {
            ticketId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Ticket",
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                min:1,
                default:1,
            }   
        }
    ]
} ,{
    timestamps:true
})

const Cart =mongoose.model("Cart",cartShema)
module.exports ={Cart}