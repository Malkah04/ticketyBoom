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
    const {title ,description ,category ,date ,time,price ,numOfTickets,images,organizer,status} = req.body;
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
        status
        })
        const result = await ticket.save();
        res.status(201).json(result);
   

}))

router.put('/:id', asyncHandler(async(req,res)=>{
    const {title ,description ,category ,date ,time,price ,numOfTickets,images,organizer,status} = req.body;
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
            status
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

module.exports =router

