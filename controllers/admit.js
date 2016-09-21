'use strict'

const Patient = require('../models/patient')

module.exports.new = (req, res) => {
	res.render('admit')
}

module.exports.create = ({body}, res, next) => {
	let newPatient = body
	newPatient.admissionDate = new Date().toLocaleString()

	Patient
		.create(newPatient)
		.then(() => res.redirect('/'))
		.catch((err) => next(err))
}