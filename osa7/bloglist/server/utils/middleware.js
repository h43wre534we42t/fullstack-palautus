const User = require('../models/user')
const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } 
    else if (error.name === 'MongoServerError') {
        return response.status(400).json({ error: 'Username already exists' })
    } 
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'Token invalid' })
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('Authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		request.token = authorization.replace('Bearer ', '')
	}
	next()
}

const userExtractor = async (request, response, next) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!decodedToken) {
		return response.status(401).json({ error: 'token invalid' })
	}
	request.user = await User.findById(decodedToken.id)
	next()
}

module.exports = {
    errorHandler,
    tokenExtractor,
		userExtractor
}