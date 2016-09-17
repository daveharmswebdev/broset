'use stritc'

// destructure connect and disconnect from database
const { connect, disconnect } = require('./database')

// use patients model
const Patient = require('../models/patient')