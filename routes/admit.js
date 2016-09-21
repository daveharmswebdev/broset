'use strict'

const { Router } = require('express')
const router = Router()

const ctrl = require('../controllers/admit')

router.get('/admit', ctrl.new)

router.post('/admit', ctrl.create)

module.exports = router