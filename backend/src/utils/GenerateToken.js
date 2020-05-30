const jwt = require("jsonwebtoken")

const authConfig = require('../config/auth.json')

function GenerateToken(id) {
  const token = jwt.sign({ id }, authConfig.hash, {
    expiresIn: 86400,
  })

  return token
}

module.exports = GenerateToken