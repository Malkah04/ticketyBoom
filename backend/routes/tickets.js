const express =require('express');
const router =express.Router();
const asyncHandler = require('express-async-handler');
const { Ticket } = require('../models/Ticket');

//get

router.get('/', asyncHandler( async (req, res) => {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
}))

//get by id

router.get('/:id' ,asyncHandler(async(req ,res)=>{
    const ticket =await Ticket.findById(req.params.id);
    if(!ticket){
        return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(200).json(ticket);

}))

// create ticket

router.post('/' ,asyncHandler(async(req ,res)=>{
    const {title ,location,description ,category ,date ,time,price ,numOfTickets,images,organizer,status} = req.body;
        const ticket =new Ticket({
        title,
        description,
        category,
        date,
        time,
        price,
        numOfTickets,
        images,
        organizer,
        status,
        location,
        })
        const result = await ticket.save();
        res.status(201).json(result);
   

}))

router.put('/:id', asyncHandler(async(req,res)=>{
    const {title ,location ,description ,category ,date ,time,price ,numOfTickets,images,organizer,status} = req.body;
        const ticket =await Ticket.findByIdAndUpdate(req.body.params ,
            {$set:{
            title,
            description,
            category,
            date,
            time,
            price,
            numOfTickets,
            images,
            organizer,
            status,
            location,
            }
        }, {new :true}
        )
        res.status(201).json({message: 'ticket updated' ,ticket})
    
}))

router.delete('/:id' , asyncHandler(async(req,res)=>{
    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
       return res.status(404).json({message:'not ticket to delete'})
    }
    await Ticket.findByIdAndDelete(req.params.id)
    res.status(200).json({message:'ticket deleted'})

    
}))

//get tickets by category
router.get('/category/:category', asyncHandler(async(req,res)=>{
    const category =req.params.category
    const ticket = await Ticket.find({category :category})
    if(!ticket || ticket.length === 0){
        return res.status(404).json({message : "no ticket found"})
    }
    res.status(200).json(ticket);
}))

//get num of recent tickets
router.get('/latest/:num' , asyncHandler(async(req,res)=>{
    const n = parseInt(req.params.num, 10);
    const tickets =await Ticket.find().sort({createdAt : -1}).limit(n);
    if(!tickets){
        res.status(500).json({message :`error to fetch ${n} tickets`})
    }
    res.status(200).json(tickets);
}))

module.exports =router

