const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find()


    res.status(200).json(users)


})

const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body)
    if (!req.body.name) {
        // res.status(400).json({ message: 'Please add a text field' })
        res.status(400)
        throw new Error('Please add a name field')
    }


    if (!req.body.email) {
        // res.status(400).json({ message: 'Please add a text field' })
        res.status(400)
        throw new Error('Please add an email field')
    }

    if (!req.body.password) {
        // res.status(400).json({ message: 'Please add a text field' })
        res.status(400)
        throw new Error('Please add a password field')
    }

    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    res.status(200).json(user)

})

const loginUser = asyncHandler(async (req, res) => {
    // const users = await User.find()


    res.status(200).json({ message: 'Login user' })


})

const getMe = asyncHandler(async (req, res) => {
    // const users = await User.find()


    res.status(200).json({ message: 'User data display' })


})

const updateUser = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.param.id, req.body,
        {
            new: true,
        })

    // res.status(200).json(updatedGoal)
    res.status(200).json({ message: `Update goal ${req.params.id}` })

})

const deleteUser = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    await goal.remove()

    res.status(200).json({
        id: req.params.id,
        text: goal.text,
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