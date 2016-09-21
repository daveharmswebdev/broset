'use strict'

const Patient = require('../models/patient')

module.exports.index = (req, res) => {
	Patient
		.find()
		.sort({lastName: 1})
		.then( patients => res.render('home', {patients}))
}