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
            'Art',
            'Comdy',
            'Music',
            'Sports',
            'Movies',
            'LifeStyle'
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
        type:number,
        required:true,
    },
    images:{
        type:[String],
        default :[],
    },
    sold :{
        type:Number,
        default:0,
    }
})


const Ticket = mongoose.model("Ticket", ticketSchema)

module.exports={
    Ticket
}