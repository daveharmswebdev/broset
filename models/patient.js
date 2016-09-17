'use strict'

const mongoose = require('mongoose')

module.exports = mongoose.model('Patient', {
	lastName: String,
	firstName: String,
	room: String,
	physician: String,
	admissionDate: String,
	brosetScore: {
		type: [
			{
				score: { type: Number, required: true },
				comment: String,
				date: { type: String, default: new Date().toLocaleString() }
			}
		], 
		default: []
	}
})