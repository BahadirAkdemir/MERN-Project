const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const Note = require('../models/noteModel');
const {text} = require("express");



const getNotes = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)
    if(ticket.user.toString() !== req.user.id)
    {
        res.status(401)
        throw new Error('Not authorized')
    }

    process.stdout.write("laylaylom")

    const notes = await Note.find({ticket: req.params.ticketId})

    res.status(200).json(notes)
})

const addNote = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)
    if(ticket.user.toString() !== req.user.id)
    {
        res.status(401)
        throw new Error('Not authorized')
    }

    process.stdout.write("laylaylom")

    const note = await Note.create({
        ticket: req.params.ticketId,
        text: req.body.text,
        isStaff: req.body.staff,
        user: req.user._id
    })

    res.status(200).json(note)


})

module.exports = { getNotes, addNote }