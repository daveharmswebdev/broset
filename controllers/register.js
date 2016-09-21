'use strict'

const User = require('../models/user')
const bcrypt = require('bcrypt')

module.exports.new = (req, res) => {
	res.render('register', {page: 'register'})
}

module.exports.create = ({body: {user, pass, confirmation}}, res) => {
	if (pass === confirmation) {
		User
			.findOne({user})
			.then( user => {
				if (user) {
					res.render('register', {error: 'email already being used'})
				} else {
					return new Promise((resolve, reject) => {
						bcrypt.hash(pass, 15, (err,hash) => {
							if (err) {
								reject(err)
							} else {
								resolve(hash)
							}
						})
					})
				}
			})
			.then(hash => User.create({ user, pass: hash}))
			.then(() => res.redirect('/'))
	} else {
		res.render('register', { error: 'Password and confirm do not match'})
	}
}