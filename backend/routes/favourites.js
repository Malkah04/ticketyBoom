const express =require("express")
const router =express.Router()
const asyncHandler=require("express-async-handler")
const {Favourite} =require("../models/Favourite")
const {User} =require("../models/User")
const {Ticket} =require("../models/Ticket")


router.get('/:userId' , asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.userId);
    if(!user){
        return res.status(400).json({message:"user not exist"})
    }
    const fav =await Favourite.findOne({userId:req.params.userId})
    if(!fav || fav.ticketId.length===0){
        return res.status(400).json({message:"no fav item"})
    }
    const tickets =await Ticket.find({_id :{$in:fav.ticketId}})
    res.status(200).json(tickets)
}))

router.post('/',asyncHandler(async(req,res)=>{
    const {userId,ticketId} =req.body;
    if(!userId||!ticketId){
        return res.status(404).json("ticket id and user id required")
    }
    const user = await User.findById(userId);
    if(!user){
        return res.status(400).json({message:"user not exist"})
    }
    const ticket =await Ticket.findById(ticketId)
    if(!ticket){
        return res.status(400).json({message:"ticket not exist"})
    }
    const userIn =await Favourite.findOne({userId})
    if(!userIn){
        const createUser =new Favourite({
            userId,
            ticketId,
        })
        await createUser.save();
        return res.status(201).json({message:"ticket added to favourites"})
    }
    if(userIn.ticketId.includes(ticketId)){
        return res.status(400).json("item already in fav")
    }
    await Favourite.findOneAndUpdate(
        {userId},
        {$push:{ticketId:ticketId}},
        {new:true},
    )
    res.status(201).json({message:"ticket add to fav"})
}))

router.delete('/',asyncHandler(async(req,res)=>{
    const {ticketId,userId} =req.body;
    if(!ticketId||!userId){
        return res.status(404).json("ticket id and user id required")
    }
    const user = await User.findById(userId);
    if(!user){
        return res.status(400).json({message:"user not exist"})
    }
    const ticket =await Ticket.findById(ticketId)
    if(!ticket){
        return res.status(400).json({message:"ticket not exist"})
    }
    const userFav =await Favourite.findOne({userId})
    if(!userFav){
        return res.status(400).json({message:"user not exist"})
    }
    const deletedTicket =await Favourite.findOneAndUpdate(
        {userId},
        {$pull:{ticketId}},
        {new :true}
    )
    res.status(201).json({message:"ticket deleted from fav",deletedTicket})
}))



module.exports =router;