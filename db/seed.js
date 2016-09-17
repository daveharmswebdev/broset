'use strict'

// destructure connect and disconnect from database
const { connect, disconnect } = require('./database')

// use patients model
const Patient = require('../models/patient')
const patients = require('./patients.json')
const Intervention = require('../models/intervention')
const interventions = require('./interventions.json')

connect()
	.then(() => Patient.remove({}))
	.then(() => Patient.insertMany(patients))
	.then(() => Intervention.remove({}))
	.then(() => Intervention.insertMany(interventions))
	.then(disconnect)
	.catch(console.error)
