const bcrypt = require("bcryptjs")

const User = require('../models/User')
const GenerateToken = require("../utils/GenerateToken")

module.exports = {
  async signUp(req, res) {
    const { name, email, password } = req.body

    const mailExists = await User.findOne({ email })

    if(mailExists) {
      return res.status(409).json({ error: "Email Já existe. Tente novamente!" })
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
      return res.status(406).json({ error: "Falha em registrar novo usuário" })
    }
  },

  async signIn(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if(!user) return res.status(404).json({ error: "Usuário não encontrado" })

    const verifyPassword = await bcrypt.compare(password, user.password)

    if(!verifyPassword) return res.status(401).json({ error: "Senha inválida. Tente Novamente!" })

    user.password = undefined
    
    const token = GenerateToken(user.id)

    return res.json({ user, token })
  }
}