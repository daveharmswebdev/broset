'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const { red, cyan} = require('chalk')

const routes = require('../routes/index')
const { connect } = require('../db/database')

const app = express()

const port = process.env.PORT || 3000
app.set('port', port)

// using pug to server static files
app.set('view engine', 'pug')


app.locals.errors = {} // to avoid guard statements
app.locals.body = {}

// middlewares
app.use(session({
	store: new RedisStore(),
	secret: 'everyoneIsA6'
}))

app.use((req, res, next) => {
	app.locals.user = req.session.user
	console.log('the user is', app.locals.user)
	next()
})

// logs out methods
app.use(({ method, url, headers: { 'user-agent': agent}}, res, next) => {
	const timeStamp = new Date()
	console.log(`[${timeStamp}] "${cyan(`${method} ${url}`)}" "${agent}"`)
	next()
})

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

// routes
app.use(routes)

// 404 page
app.use((req, res) => res.render('404'))

// error handling middleware
app.use((
		err, 
		{ method, url, headers: { 'user-agent': agent } }, 
		res, 
		next
	) => {
		if (process.env.NODE_ENV === 'production') {
		  res.sendStatus(err.status || 500)
		} else {
			res.set('Content-Type', 'text/plain').send(err.stack)
		}

		const timeStamp = new Date()
		const statusCode = res.statusCode
		const statusMessage = res.statusMessage

	  console.error(
    	`[${timeStamp}] "${red(`${method} ${url}`)}" Error (${statusCode}): "${statusMessage}"`
    )
	  console.log(err.stack)
	}
)

connect()
	.then(() => {
		app.listen(app.get('port'), () => {
			console.log(`Express running and now listening on ${app.get('port')}`)
		})
	})