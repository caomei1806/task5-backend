const express = require('express')
const { login, getUser, getAllUsers } = require('../controllers/userController')

const router = express.Router()

router.route('/').post(getUser)
router.route('/users').get(getAllUsers)
router.route('/login').post(login)

module.exports = router
