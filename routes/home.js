'use strict'

const { Router } = require('express')
const router = Router()
const ctrl = require('../controllers/home')

router.get('/', ctrl.index)

module.exports = router