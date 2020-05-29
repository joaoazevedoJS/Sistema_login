const bcrypt = require("bcryptjs")

const User = require('../models/User')

module.exports = {
  async store (req, res) {
    const { name, email, password } = req.body

    const mailExists = await User.findOne({ email })

    if(mailExists) {
      return res.status(400).json({ error: "Email Já existe. Tente novamente!" })
    }

    try {
      const hash = await bcrypt.hash(password, 10)

      const user = await User.create({
        name,
        email, 
        password: hash
      })

      user.password = undefined

      return res.status(200).json({ user })
    } catch (e) {
      return res.status(400).json({ error: "Registration failed" })
    }
  },
}