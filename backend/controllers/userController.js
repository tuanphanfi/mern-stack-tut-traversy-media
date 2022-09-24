const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find()


    res.status(200).json(users)


})

const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        // res.status(400).json({ message: 'Please add a text field' })
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error('User already exists')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }


    // status(201) thay cho dong nay
    // res.status(200).json(user)


})

const loginUser = asyncHandler(async (req, res) => {
    // const users = await User.find()
    const { email, password } = req.body

    // check for user email
    const user = await User.findOne({ email })
    // console.log(user.email)

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }



})

const getMe = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({ 
        id: _id,
        name,
        email
     })
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }

    const updatedUser = await User.findByIdAndUpdate(req.param.id, req.body,
        {
            new: true,
        })

    // res.status(200).json(updatedGoal)
    res.status(200).json({ message: `Update user ${req.params.id}` })

})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }

    await user.remove()

    res.status(200).json({
        id: req.params.id,
        name: user.name,
        email: user.email,
        delele: "Done"

    })
    // console.log(goal)
})


module.exports = {
    getUsers,
    registerUser,
    loginUser,
    getMe,
    updateUser,
    deleteUser

}