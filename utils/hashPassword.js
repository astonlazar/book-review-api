const bcrypt = require('bcryptjs')

async function hashPassword(password) {
  let hashed = await bcrypt.hash(password, 10)
  return hashed
}

async function comparePassword(password, hashedPassword) {
  let result = await bcrypt.compare(password, hashedPassword)
  return result
}

module.exports = {
  hashPassword,
  comparePassword
}