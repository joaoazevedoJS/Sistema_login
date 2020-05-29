const { Router } = require("express")

const routes = Router()

const SignController = require("./controllers/SignController")
const AuthController = require("./controllers/AuthController")

routes.use('/auth', AuthController.validate)
routes.get('/auth', AuthController.auth)

routes.post('/users/signin', SignController.signIn)
routes.post('/users/signup', SignController.signUp)

module.exports = routes