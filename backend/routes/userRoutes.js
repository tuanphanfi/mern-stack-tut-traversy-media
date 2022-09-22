const express = require('express')
const router = express.Router()

const { getUsers,
    registerUser,
    loginUser,
    getMe,
    updateUser,
    deleteUser
} = require('../controllers/userController')

router.route('/').get(getUsers).post(registerUser)
router.post('/login', loginUser)
router.get('/me', getMe)
router.route('/:id').put(updateUser).delete(deleteUser)

// router.get('/', getUsers)

// router.post('/', registerUser)

// router.put('/:id', updateUser)

// router.delete('/:id', deleteUser)

module.exports = router