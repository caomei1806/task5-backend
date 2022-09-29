const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema(
	{
		recipient: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: [true, 'Enter message title'],
		},
		body: {
			type: String,
		},
		user: {
			type: String,
			reguired: [true, 'Enter recipient'],
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Message', MessageSchema)
