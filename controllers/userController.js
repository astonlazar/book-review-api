const User = require('../models/userModel')
const { hashPassword, comparePassword } = require('../utils/hashPassword')

const userSignup = async (req, res) => {
  const {username, email, password} = req.body
  const userCheck = await User.findOne({email: email})
  if(userCheck) {
    res.status(501).json({message: 'User already exists, signup with another email.'})
  } else {
    let hashedPass = await hashPassword(password)
    let newUser = new User({
      username,
      email,
      password: hashedPass,
    })
  
    await newUser.save()
    res.status(201).json({message: 'User created successfully'})
  }
}

const userLogin = async (req, res) => {
  const {email, password} = req.body
  const userCheck = await User.findOne({email: email})
  if(userCheck) {
    let passwordCheck = await comparePassword(password, userCheck.password)
    if(passwordCheck) {
      res.status(200).json({message: 'User credential matched'})
    } else {
      res.status(401).json({message: 'Password incorrect'})
    }
  } else {
    res.status(401).json({message: 'User does not exist. Sign in to continue'})
  }
}


module.exports = {
  userSignup,
  userLogin
}