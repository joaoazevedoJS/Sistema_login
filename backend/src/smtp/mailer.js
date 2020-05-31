const path = require('path')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars') // permite colocar html dentro de variaveis

const { host, port, auth } = require('../config/mail.json')

const mails = path.join(__dirname, 'mails')

const transport = nodemailer.createTransport({
  host,
  port,
  auth
});

const handlebarsOptions = {
  viewEngine: {
    partialsDir: mails,
    defaultLayout: undefined,
  },
  viewPath: mails,
  extName: '.html',
}

transport.use('compile', hbs(handlebarsOptions))

module.exports = transport