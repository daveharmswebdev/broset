'use strict'

// destructure connect and disconnect from database
const { connect, disconnect } = require('./database')

// use patients model
const Patient = require('../models/patient')
const patients = require('./patients.json')

connect()
	.then(() => Patient.remove({}))
	.then(() => Patient.insertMany(patients))
	.then(disconnect)
	.catch(console.error)
