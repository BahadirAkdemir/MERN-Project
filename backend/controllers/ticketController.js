const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');



const getTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)
    if(!ticket)
    {
        res.status(404)
        throw new Error('Ticket not found')
    }
    if(ticket.user.toString() !== req.user._id.toString())
    {
        res.status(401)
        throw new Error('Not authorized')
    }
    res.status(200).json(ticket)
})

const deleteTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findByIdAndDelete(req.params.id)
    if(!ticket)
    {
        res.status(404)
        throw new Error('Ticket not found')
    }
    if(ticket.user.toString() !== req.user._id.toString())
    {
        res.status(401)
        throw new Error('Not authorized')
    }
    //Remove ticket
    res.status(200).json({success:true})
})

const updateTicket = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)
    if(!ticket)
    {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user._id.toString())
    {
        res.status(401)
        throw new Error('Not authorized')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(200).json(updatedTicket)

})

const getTickets = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const tickets = await Ticket.find({user: req.user._id})
    res.status(200).json(tickets)
})

const createTicket = asyncHandler(async (req, res) => {
    const {product, description} = req.body

    if (!product || !description) {
        res.status(400)
        throw new Error('Please fill all fields')
    }

    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.create({
        user: req.user._id,
        product,
        description,
        status: 'new'
    })

    res.status(200).json(ticket)
})

module.exports = {getTickets, createTicket, getTicket, updateTicket, deleteTicket}