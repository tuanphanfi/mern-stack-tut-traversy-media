const asyncHandler = require('express-async-handler')

const Todo = require('../models/todoModel')

const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find()


    res.status(200).json(todos)


})

const setTodo = asyncHandler(async (req, res) => {
    console.log(req.body)
    if (!req.body.text) {
        // res.status(400).json({ message: 'Please add a text field' })
        res.status(400)
        throw new Error('Please add a todo field')
    }

    const todo = await Todo.create({
        text: req.body.text
    })

    res.status(200).json(todo)

})

const updateTodo = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update todo ${req.params.id}` })

})

const deleteTodo = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete todo ${req.params.id}` })
})


module.exports = {
    getTodos,
    setTodo,
    updateTodo,
    deleteTodo

}