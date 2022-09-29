require('express-async-errors')
require('dotenv').config()

const express = require('express')
const app = express()

// additional packages
const morgan = require('morgan')
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')

// database connection
const connectDB = require('./db/connect')

// routers
const userRouter = require('./routers/userRoutes')
const messageRouter = require('./routers/messageRoutes')

// middleware
const NotFoundMiddleware = require('./middleware/not-found')
const ErrorHandlerMiddleware = require('./middleware/error-handler')

app.set('trust proxy', 1)
app.use(
	rateLimiter({
		windowsMs: 15 * 60 * 1000,
		max: 60,
	})
)
app.use(helmet())
const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
}
app.use(cors(corsOptions))
app.use(xss())
app.use(mongoSanitize())

app.use(express.json())
app.use(express.static('./public'))

app.use('/api/v1/user', userRouter)
app.use('/api/v1/messages', messageRouter)

app.use(NotFoundMiddleware)
app.use(ErrorHandlerMiddleware)

const port = process.env.PORT || 5001

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL)
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}...`)
		})
	} catch (error) {
		console.log(error)
	}
}
start()
