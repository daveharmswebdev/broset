'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const routes = require('../routes/index')
const { connect } = require('../db/database')

const port = process.env.PORT || 3000
app.set('port', port)

// using pug to server static files
app.set('views', 'views')
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
	store: new RedisStore(),
	secret: 'everyoneIsA6'
}))

// locals
// app.locals.company
// app.locals.errors 
// app.locals.body
// app.locals.user

// middleware that captures the user
// check his pug file as well he did something with the login and register logic
// for session storage we will use redis
// app.use((req, res, next) => {
// 
// 	app.locals.user = req.session.user
// })

app.use(routes)

app.use((error, req, res, next) => {
  res.sendStatus(500)
  console.log(error)
})

connect()
	.then(() => {
		app.listen(app.get('port'), () => {
			console.log(`Express running and now listening on ${app.get('port')}`)
		})
	})