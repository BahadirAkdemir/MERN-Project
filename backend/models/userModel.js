const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true,
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        trim: true,
        minLength: [6, 'Your password must be at least 6 characters long'],
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true

    }
},
    
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)