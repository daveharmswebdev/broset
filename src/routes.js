'use strict'

const { Router } = require('express')
const router = Router()

//models
const Patient = require('../models/patient')

router.get('/', (req, res) => {
	Patient
		.find()
		.sort({lastName: 1})
		.then( patients => res.render('home', {patients}))
})

router.get('/admit', (req, res) => {
	res.render('admit')
})

module.exports = router