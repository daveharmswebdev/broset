'use strict'

const { Router } = require('express')
const router = Router()

const { edit, destroy } = require('../controllers/session')

router.get('/logout', edit)

router.post('/logout', destroy)

module.exports = router