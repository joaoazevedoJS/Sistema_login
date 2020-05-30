const { Router } = require("express")

const routes = Router()

const SignController = require("./controllers/SignController")
const UserController = require("./controllers/UserController")

routes.use('/users', UserController.validate)
routes.get('/users' , UserController.index)

routes.post('/signin', SignController.signIn)
routes.post('/signup', SignController.signUp)

module.exports = routes