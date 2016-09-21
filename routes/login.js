'use strict'

const { Router } = require('express')
const router = Router()

const User = require('../models/user')
const bcrypt = require('bcrypt')

router.post('/login', ({ session, body: {user, pass}}, res, next) => {
	User
		.findOne({user})
		.then( user => {
			if (user) {
				return new Promise((resolve, reject) => {
					bcrypt.compare(pass, user.pass, (err, matches) => {
						if (err) {
							reject(err)
						} else {
							resolve(matches)
						}
					})
				})
			} else {
				res.render('login', { error: 'That email is not registered with a user' })
			}
		})
		.then( matches => {
			if (matches) {
				session.user = user
				res.redirect('/')
			} else {
				res.render('login', {error: 'password does not match!'})
			}
		})
		.catch( err => next(err))
})

router.get('/login', (req, res) => {
	res.render('login', {})
})

module.exports = router