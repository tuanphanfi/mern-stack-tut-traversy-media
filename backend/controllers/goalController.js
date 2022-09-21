const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')

const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()


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
        text: req.body.text
    })

    res.status(200).json(goal)

})

const updateGoal = asyncHandler(async (req, res) => {
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

const deleteGoal = asyncHandler(async (req, res) => {
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
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal

}