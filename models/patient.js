'use strict'

const mongoose = require('mongoose')

module.exports = mongoose.model('Patient', {
	lastName: String,
	firstName: String,
	room: String,
	physician: String,
	admissionDate: String
})