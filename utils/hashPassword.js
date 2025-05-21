const bcrypt = require('bcryptjs')

//function to hash the given password
async function hashPassword(password) {
  let hashed = await bcrypt.hash(password, 10)
  return hashed
}

//function to compare the given password to hashed password
async function comparePassword(password, hashedPassword) {
  let result = await bcrypt.compare(password, hashedPassword)
  return result
}

module.exports = {
  hashPassword,
  comparePassword
}