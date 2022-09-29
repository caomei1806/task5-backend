const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const Message = require('../models/Message')
const { CustomAPIError } = require('../errors')
const getAllMessages = async (req, res) => {
	const { name: username } = req.params
	const messages = await Message.find({ recipient: username })
	const user = await User.findOne({ name: username })
	console.log(messages)
	res.status(StatusCodes.OK).json({ messages, user: user.name })
}
const sendMessage = async (req, res) => {
	const { name: username } = req.params
	const { recipient, title, body } = req.body

	if (!recipient || !title || !username) {
		throw new CustomAPIError.BadRequestError('Please provide valid input')
	}
	const recipientExists = await User.findOne({ name: recipient })
	if (!recipientExists) {
		throw new CustomAPIError.BadRequestError(`User: ${recipient} doesnt exist`)
	}
	const newMessage = await Message.create({
		recipient,
		title,
		body,
		user: username,
	})

	res.status(StatusCodes.OK).json({ message: newMessage })
}

module.exports = { getAllMessages, sendMessage }
