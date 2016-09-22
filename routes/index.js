'use strict'

const { Router } = require('express')
const router = Router()

const admit = require('./admit')
const broset = require('./broset')
const home = require('./home')
const login = require('./login')
const register = require('./register')
const logout = require('./logout')

router.use(admit)
router.use(broset)
router.use(home)
router.use(login)
router.use(register)
router.use(logout)

module.exports = router