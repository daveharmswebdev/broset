'use strict'

const { Router } = require('express')
const router = Router()
const ctrl = require('../controllers/session')

router.get('/login', ctrl.new)

router.post('/login', ctrl.create)

module.exports = router