'use strict'

const { Router } = require('express')
const router = Router()

const Patient = require('../models/patient')

router.get('/admit', (req, res) => {
	res.render('admit')
})

router.post('/admit', ({body}, res, next) => {
	let newPatient = body
	newPatient.admissionDate = new Date().toLocaleString()

	Patient
		.create(newPatient)
		.then(() => res.redirect('/'))
		.catch((err) => next(err))
})

module.exports = router