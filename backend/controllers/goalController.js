const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })

    // console.log(req.user.id)
    // res.status(200).json(req.user)


    res.status(200).json(goals)


})

const setGoal = asyncHandler(async (req, res) => {
    console.log(req.body)
    if (!req.body.text) {
        // res.status(400).json({ message: 'Please add a text field' })
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)

})

const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    // console.log(goal)
    // console.log(goal.user)

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGoal)
    // res.status(200).json({ message: `Update goal ${req.params.id}` })

})

const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }


    const user = await User.findById(req.user.id)
    // Check for user
    if (user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
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
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal

}