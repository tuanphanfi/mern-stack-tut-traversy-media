const express = require('express')
const router = express.Router()

const {
    getUsers,
    registerUser,
    loginUser,
    getMe,
    updateUser,
    deleteUser
} = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')

router.get('/', getUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.route('/:id').put(updateUser).delete(deleteUser)

// router.get('/', getUsers)

// router.post('/', registerUser)

// router.put('/:id', updateUser)

// router.delete('/:id', deleteUser)

module.exports = router