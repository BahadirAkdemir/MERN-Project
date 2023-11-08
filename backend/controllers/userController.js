const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const User = require('../models/userModel') 

const GenerateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body
     if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill all fields')
    }

    // Find if user already exists
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    // Send response
    if (user)
    {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: GenerateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Please fill all fields');
    }

    const user = await User.findOne({ email });
    if (user) {
        // write password to terminal
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: GenerateToken(user._id)
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } else {
        res.status(401);
        throw new Error('User not found');
    }
});

const getMe = asyncHandler(async (req, res) => {
    const user = {id: req.user._id, name: req.user.name, email: req.user.email}
    res.status(200).json(user)
})

module.exports = { registerUser, authUser, getMe }
