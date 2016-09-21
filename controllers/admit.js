'use strict'

const Patient = require('../models/patient')

module.exports.new = (req, res) => {
	res.render('admit', {page: 'admit'})
}

module.exports.create = ({body}, res, next) => {
	let newPatient = body
	newPatient.admissionDate = new Date().toLocaleString()

	Patient
		.create(newPatien)
		.then(() => res.redirect('/'))
		.catch((err) => next(err))
}