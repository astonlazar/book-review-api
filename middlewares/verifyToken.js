const jwt = require('jsonwebtoken')

//function middleware to check for user authentication
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if(!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({message: 'User unauthorized!'})
  }

  const token = authHeader.split(' ')[1]

  try {
    const decode = jwt.decode(token)
    console.log('decoded details -', decode)
    req.user = decode
    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Error in verifyToken'})
  }
}

module.exports = verifyToken