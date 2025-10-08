const userModel = require('../models/User.Model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const auth = {}

const register = async (req, res) => {
    try {
        
   
    const { username, email, password, role } = req.body

    const user = await userModel.findOne({ email })
    if (user) {
        return res.status(400).json({ msg: 'User already exists' })
    }   

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    
    const newUser =await userModel.create({
        username,
        email,
        password: hashedPassword,
        role
    })

    const token = jwt.sign({
        id: newUser._id,
        role: newUser.role
    },process.env.JWT_SECRET)
    res.cookie('token', token,{httpOnly: true})

    res.json({
        msg: 'User created successfully',
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        },
        token
    })
} catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Server error' })
    return
}

}

const login = async (req, res) => {
    try {
   
    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(400).json({ msg: 'User does not exist' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    },process.env.JWT_SECRET)
    res.cookie('token', token,{httpOnly: true})

    res.json({
        msg: 'User logged in successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role 
        },
        token
    })
         
} catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Server error' })
        return
    }
}


module.exports = {register, login}