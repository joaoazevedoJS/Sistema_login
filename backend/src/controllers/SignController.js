const bcrypt = require("bcryptjs")
const crypto = require('crypto')

const User = require('../models/User')
const GenerateToken = require("../utils/GenerateToken")
const mailer = require('../smtp/mailer')

module.exports = {
  async signUp(req, res) {
    const { name, email, password } = req.body

    const mailExists = await User.findOne({ email })

    if (mailExists) {
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

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" })

    const verifyPassword = await bcrypt.compare(password, user.password)

    if (!verifyPassword) return res.status(401).json({ error: "Senha inválida. Tente Novamente!" })

    user.password = undefined

    const token = GenerateToken(user.id)

    return res.json({ user, token })
  },

  async forgot(req, res) {
    const { email } = req.body

    try {
      const user = await User.findOne({ email })

      if (!user) return res.status(404).json({ error: "Usuário não encontrado" })

      const token = crypto.randomBytes(20).toString('hex')

      const now = new Date();
      now.setHours(now.getHours() + 1)

      await User.findByIdAndUpdate(user.id, {
        '$set': {
          passwordResetToken: token,
          passwordResetExpires: now,
        }
      })

      mailer.sendMail({
        to: email,
        from: 'contato@joaoazevedojs.com.br',
        template: "forgot_password",
        context: { token }
      }, (err) => {
        if (err) return res.status(400).json({ error: "Não foi possivel enviar email de recuperação de senha!" })
      })

      return res.send('')

    } catch (err) {
      return res.status(400).json({ error: "Erro em resetar a senha, tente novamente!" })
    }
  },

  async reset(req, res) {
    const { token } = req.query
    const { email, password } = req.body

    try {
      const user = await User.findOne({ email })
        .select('+passwordResetToken passwordResetExpires')

      if (!user) return res.status(404).json({ error: "Usuário não encontrado" })

      if(token !== user.passwordResetToken) 
        return res.status(401).json({ error: 'Token invalid' })

      const now = new Date();

      if(now > user.passwordResetExpires)
        return res.status(404).json({ error: "Token expired" })

      const hash = await bcrypt.hash(password, 10)

      user.password = hash

      await user.save()

      return res.send('')
    } catch (e) {
      return res.status(400).json({ error: "Erro em trocar a senha, tente novamente!" })
    }
  }
}