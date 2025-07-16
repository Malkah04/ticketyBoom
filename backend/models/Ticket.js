const mongoose = require('mongoose');
const { describe } = require('node:test');
const { type } = require('os');

const ticketSchema =mongoose.Schema({
    title: {
        type:String,
        required :true
    },
    description :{
        type:String,
        required :true
    },
    category :{
        type:String,
        required:true,
        enum :[
            'art',
            'comedy',
            'sport',
            'movie',
            'lifeStyle',
            'theater',
            "concert"
        ]
    },
    date:{
        type :Date,
        required:true
    },
    time :{
        type :String ,
        required:true,
    },
    price:{
        type :Number,
        required :true,
    },
    numOfTickets:{
        type:Number,
        required:true,
    },
    images:{
        type:[String],
    },
    sold :{
        type:Number,
        default:0,
    },
    organizer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:[
            'completed',
            'inComplete',
        ],
        default:'inComplete'
    },
    location:{
        type:String,
        required:true
    },


},{
    timestamps:true
})


const Ticket = mongoose.model("Ticket", ticketSchema)

module.exports={
    Ticket
}