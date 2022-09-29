const express = require('express')
const {
	getAllMessages,
	sendMessage,
} = require('../controllers/messageController')

const router = express.Router()
router.route('/:name').get(getAllMessages).post(sendMessage)

module.exports = router
