'use strict'

const { Router } = require('express')
const router = Router()

const admit = require('./admit')
const login = require('./login')
const register = require('./register')
const home = require('./home')
const broset = require('./broset')

router.use(home)
router.use(admit)
router.use(login)
router.use(register)
router.use(broset)

module.exports = router