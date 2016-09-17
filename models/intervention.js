'use strict'

const mongoose = require('mongoose')

module.exports = mongoose.model('Intervention', {
	name: String
})