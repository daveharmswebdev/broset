'use strict'

const passport = require('passport')
const { Strategy } = require('passport-local')
const { compare } = require('bcrypt')

const User = require('../models/user')

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((_id, done) =>  User.findOne({ _id }, done))

passport.use(new Strategy({
		usernameField: 'user',
		passwordField: 'pass'
	},
  function(user, pass, done) {
    User.findOne({ user: user }, function(err, user) {
      if (err) return done(err)
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      compare(pass, user.pass, function(err, matches) {
      	if (err) {
      		return done(err)
      	}
				if (!matches) {
          return done(null, false, { message: 'Incorrect password'})
        } else {
          return done(null, user);
        }
      })
    });
  }
));
