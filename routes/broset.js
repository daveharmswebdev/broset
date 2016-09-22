'use strict'

const { Router } = require('express')
const router = Router()
const ctrl = require('../controllers/broset')


router.get('/broset/:_id', ctrl.new)

router.post('/broset/:_id', ctrl.create)

module.exports = router