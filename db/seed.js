'use strict'

// destructure connect and disconnect from database
const { connect, disconnect } = require('./database')

// use patients model
const Patient = require('../models/patient')

connect()
	.then(() => Patient.remove({}))
	.then(() => Patient.insertMany([
			{
				lastName: 'Doe',
				firstName: 'John',
				room: '101a',
				physician: 'Smith, Henry',
				admissionDate: new Date().toUTCString()
			}
		]))
	.then(disconnect)
	.catch(console.error)
