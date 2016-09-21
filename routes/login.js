'use strict'

const { Router } = require('express')
const router = Router()
const ctrl = require('../controllers/login')

router.post('/login', ctrl.show)

router.get('/login', ctrl.index)

module.exports = router