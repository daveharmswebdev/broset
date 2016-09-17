'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const app = express()
const { connect } = require('../db/database')

const port = process.env.PORT || 3000
app.set('port', port)

// using pug to server static files
app.set('views', 'views')
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes)

connect()
	.then(() => {
		app.listen(app.get('port'), () => {
			console.log(`Express running and now listening on ${app.get('port')}`)
		})
	})