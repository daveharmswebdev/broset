'use strict'

const Patient = require('../models/patient')
const Intervention = require('../models/intervention')

module.exports.new = ({params: {_id}}, res, next) => {

	Promise
		.all([
			Patient.find({_id}),
			Intervention.find().sort({name: 1})
		])
		.then(([patients, interventions]) => {
			res.render('broset', {
				patient: patients[0], 
				scores: patients[0].brosetScore, 
				interventions: interventions
		  })
		})
		.catch( err => next(err))
}

module.exports.create = ({params: {_id}, user: {user}, body: {intervention, comment, score}}, res, next) => {
	console.log('user******user', user)
	Patient
		.update(
			{ 
				_id
			}, 
			{
				$push: {
					'brosetScore': {
						score: score,
						intervention: intervention,
						comment: comment,
						dateString: new Date().toLocaleString(),
						date: Date.now(),
						employee: user
					}
				}
			}
		)
		.then(() => {
			let currentPage = `/broset/${_id}`
			res.redirect(currentPage)
		})
		.catch( err => next(err))
}