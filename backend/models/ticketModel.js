const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        product: {
            type: String,
            required: [true, 'Please select a product'],
            enum: ['iPhone', 'MacBook', 'iMac', 'iPad', 'Apple Watch', 'AirPods', 'Apple TV', 'HomePod', 'Beats', 'Accessories'],
        },
        description: {
            type: String,
            required: [true, 'Please enter a description'],
        },
        status: {
            type: String,
            enum:['new', 'in progress', 'closed'],
            default: 'new'

        }
    },

    {
        timestamps: true
    })

module.exports = mongoose.model('Ticket', ticketSchema)