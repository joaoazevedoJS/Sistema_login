const { Router } = require("express")

const routes = Router()

const SignController = require("./controllers/SignController")
const UserController = require("./controllers/UserController")

routes.use('/users', UserController.validate)
routes.get('/users' , UserController.show)

routes.post('/signin', SignController.signIn)
routes.post('/signup', SignController.signUp)
routes.post('/forgot_password', SignController.forgot)
routes.post('/reset_password', SignController.reset)

module.exports = routes