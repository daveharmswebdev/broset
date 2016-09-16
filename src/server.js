'use strict'

const express = require('express')
const app = express()

const port = process.env.PORT || 3000
app.set('port', port)

app.get('/', (req, res) => {
	res.send('hello world!')
})

app.listen(app.get('port'), () => {
	console.log(`Express running and now lisening on ${app.get('port')}`)
})