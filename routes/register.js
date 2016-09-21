'use strict'

const { Router } = require('express')
const router = Router()
const ctrl = require('../controllers/register')

router.get('/register', ctrl.new)

router.post('/register', ctrl.create)

module.exports = router