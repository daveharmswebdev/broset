'use strict'

const { Router } = require('express')
const router = Router()

//models
const Patient = require('../models/patient')
const Intervention = require('../models/intervention')

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

router.get('/broset/:patientID', (req, res, next) => {

	Promise
		.all([
			Patient.find({ '_id': req.params.patientID }),
			Intervention.find().sort({name: 1})
		])
		.then(([patients, interventions]) => {
			res.render('broset', {
				patient: patients[0], 
				scores: patients[0].brosetScore, 
				interventions: interventions
		  })
		})
		.catch( err => next(err))
})

router.post('/broset/:patientID', (req, res, next) => {
	Patient
		.update(
			{ 
				'_id': req.params.patientID
			}, 
			{
				$push: {
					'brosetScore': {
						score: req.body.score,
						intervention: req.body.intervention,
						dateString: new Date().toLocaleString(),
						date: Date.now()
					}
				}
			}
		)
		.then(() => {
			let currentPage = `/broset/${req.params.patientID}`
			res.redirect(currentPage)
		})
		.catch( err => next(err))
})

module.exports = router