'use strict'

const { Router } = require('express')
const router = Router()

const admit = require('./admit')
const broset = require('./broset')
const home = require('./home')
const login = require('./login')
const register = require('./register')
const logout = require('./logout')

// pulbli route, the only one is login or register
router.use(login)
router.use(register)

// guard
router.use((req, res, next) => {
	if (req.session.user) {
		next()
	} else {
		res.redirect('/login')
	}
})

// private routs
router.use(admit)
router.use(broset)
router.use(home)
router.use(logout)

module.exports = router