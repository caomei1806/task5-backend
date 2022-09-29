const User = require('../models/User')

const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const login = async (req, res) => {
	const { username } = req.body
	let newUser
	const existingUser = await User.findOne({ name: username })
	if (existingUser) {
		res.status(StatusCodes.OK).json({ user: existingUser })
	} else {
		newUser = await User.create({
			name: username,
		})
	}
	const user = existingUser ? existingUser : newUser

	res.status(StatusCodes.OK).json({ user: user })
}
const getUser = async (req, res) => {
	const { userId, username } = req.body
	console.log('id: ' + userId + ' name:' + username)
	if (userId) {
		const user = await User.findOne({ _id: userId })
		console.log('User:' + user)
		res.status(StatusCodes.OK).json({ user })
	}
	if (username) {
		const user = await User.findOne({ name: username })
		console.log('User:' + user)
		res.status(StatusCodes.OK).json({ user })
	}
}
const getAllUsers = async (req, res) => {
	const users = await User.find({})
	res.status(StatusCodes.OK).json({ users })
}

module.exports = {
	login,
	getUser,
	getAllUsers,
}
