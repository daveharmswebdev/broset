'use strict'

const { Router } = require('express')
const router = Router()
const Patient = require('../models/patient')

router.get('/', (req, res) => {
	Patient
		.find()
		.sort({lastName: 1})
		.then( patients => res.render('home', {patients}))
})

module.exports = router