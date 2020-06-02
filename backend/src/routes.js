const { Router } = require("express")

const routes = Router()

const SignController = require("./controllers/SignController")
const UserController = require("./controllers/UserController")
const SessionController = require("./controllers/SessionController")

routes.post('/session', SessionController.create)

routes.use('/users', UserController.validate)
routes.get('/users' , UserController.show)

routes.post('/signin', SignController.signIn)
routes.post('/signup', SignController.signUp)
routes.post('/forgot_password', SignController.forgot)
routes.post('/reset_password', SignController.reset)

module.exports = routes