const { Router } = require("express")

const routes = Router()

const AuthController = require("./controllers/AuthController")

routes.post('/auth/register', AuthController.store)

module.exports = routes