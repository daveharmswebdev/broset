'use strict'

const { Router } = require('express')
const bcrypt = require('bcrypt')
const router = Router()

//models
const Patient = require('../models/patient')
const Intervention = require('../models/intervention')
const User = require('../models/user')

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

router.post('/login', (req, res, next) => {
	console.log('Post ', req.body)
	User
		.findOne({user: req.body.user})
		.then( user => {
			console.log('user', user)
			bcrypt.compare(req.body.pass, user.pass, (err, matches) => {
				if (matches) {
					console.log('matches', matches)
					console.log('looks like we made it')
					res.redirect('/')
				} else {
					res.render('login', { error: 'User and pass do not match'})
				}
			})
		})
		.catch( err => next(err))
})

router.get('/login', (req, res) => {
	res.render('login', {})
})

router.get('/register', (req, res) => {
	res.render('register')
})

router.post('/register', (req, res) => {
		bcrypt.hash(req.body.pass, 15, (err,hash) => {
			User
				.create({user: req.body.user, pass: hash})
				.then(() => res.redirect('/'))
				.catch( err => next(err))
		})
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
						comment: req.body.comment,
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