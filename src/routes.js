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

router.post('/admit', (req, res, next) => {
	let newPatient = req.body
	newPatient.admissionDate = new Date().toLocaleString()

	Patient
		.create(newPatient)
		.then(() => res.redirect('/'))
		.catch((err) => next(err))
})

module.exports = router