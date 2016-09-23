'use strict'

const passport = require('passport')

module.exports.edit = (req, res) =>
	res.render('logout', { page: 'logout' })

module.exports.destroy = (req, res) => {
	req.logout()
	res.redirect('/login')
}

module.exports.new = (req, res) => res.render('login', { page: 'login '})

module.exports.create = (req, res, next) => {
	console.log('create!!!!!!!!!!!')
  passport.authenticate('local', (err, user, msg) => {
  	console.log('error: ', err)
  	console.log('user', user)
    if (err) { return next(err) }
    if (!user) { return res.render('login', msg) }

    req.logIn(user, err => {
      if (err) { return next(err) }
      res.redirect('/')
    })
  })(req, res, next)
}