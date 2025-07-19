const express =require("express")
const router =express.Router()
const asyncHandler =require("express-async-handler")
const {User} =require("../models/User")
const {Ticket} =require("../models/Ticket")
const {Cart} = require("../models/Cart")

router.get('/:userId' ,asyncHandler(async(req,res)=>{
    const user =await User.findById(req.params.userId)
    if(!user){
        return res.status(400).json({message:"user not exist"})
    }
    const userCart =await Cart.findOne({userId:req.params.userId})
    if(!userCart || userCart.tickets.length===0){
        return res.status(400).json({message:"no user exist or no item in cart"})
    }
    const ticketsCart =await Ticket.find({_id:{$in:userCart.tickets.map(t=>t.ticketId)}})
    res.status(200).json(ticketsCart)
}))

router.post('/',asyncHandler(async(req,res)=>{
    const {userId,ticketId,quantity} =req.body;
    if(!ticketId||!userId||!quantity){
        return res.status(404).json({message:"user id ,quantity and ticket it required"})
    }
    const user =await User.findById(userId)
    if(!user){
        return res.status(400).json({message:"user not exist"})
    }
    const ticket =await Ticket.findById(ticketId)
    if(!ticket){
        return res.status(400).json({message:"ticket not found"})
    }
    const userCart =await Cart.findOne({userId})
    if(!userCart){
        const createUser = new Cart({
            userId,
            tickets:[{ticketId,quantity}],
        })
        await createUser.save();
        return res.status(200).json("item added to card")
    }
    if(userCart.tickets.find(t=>t.ticketId.toString()===ticketId.toString())){
        return res.status(400).json("item already in cart")
    }
}))

// change the quantity

router.put('/' ,asyncHandler(async(req,res)=>{
    const {ticketId,sign ,userId} =req.body
    if(!ticketId||!sign||!userId){
        return res.status(404).json({message:"user id , sign and ticket it required"})
    }
     const user =await User.findById(userId)
    if(!user){
        return res.status(400).json({message:"user not exist"})
    }
    const ticket =await Ticket.findById(ticketId)
    if(!ticket){
        return res.status(400).json({message:"ticket not found"})
    }
    const userCart =await Cart.findOne({userId})
    if(!userCart){
        const createUser = new Cart({
            userId,
            tickets:[{ticketId,quantity:1}],
        })
        await createUser.save();
        return res.status(200).json("item added to card")
    }
    const ticketCart =userCart.tickets.find(t=>t.ticketId.toString()===ticketId.toString())
    if(!ticketCart){
        userCart.tickets.push({ticketId,quantity:1})
        await userCart.save()
        return res.status(200).json("item added to card")
    }
    if(sign==='+'){
        ticketCart.quantity++;
    }
    else if(sign==='-'&& ticketCart.quantity>=1){
        ticketCart.quantity--;
    }
    else{
        return res.status(404).json({message:"sign must be + or -"})
    }
    await userCart.save();
    res.status(200).json({message:"item modified"})
    
}))

router.delete('/',asyncHandler(async(req,res)=>{
    const {ticketId,userId} =req.body
    if(!ticketId||!userId){
        return res.status(404).json({message:"user id and ticket it required"})
    }
    const user =await User.findById(userId)
    if(!user){
        return res.status(400).json({message:"user not exist"})
    }
    const ticket =await Ticket.findById(ticketId)
    if(!ticket){
        return res.status(400).json({message:"ticket not found"})
    }
    const userCart =await Cart.findOne({userId})
    if(!userCart){
        return res.status(404).json("no ticket to delete")
    }
    const deletedTicket =await Cart.findOneAndUpdate(
        {userId},
        {$pull:{tickets:{ticketId}}},
        {new:true}
    )
    res.status(200).json({message:"ticket deleted from cart" ,deletedTicket})
    
}))

module.exports=router