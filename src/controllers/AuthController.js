const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = {
  async validate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ error: "No Token provided" })

    // formato do token: Bearer dasknsjgiofevn291i2efv0492nvo2w 

    const parts = authHeader.split(' ');

    if (!parts.length === 2) return res.status(401).json({ error: "Token error" })

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: "Token malformatted" })

    jwt.verify(token, authConfig.hash, (err, decoded) => {
      if (err) return res.status(401).json({ error: "Token invalid" })

      req.userId = decoded.id

      return next()
    })
  },

  async auth(req, res) {
    res.send(req.userId)
  }
}