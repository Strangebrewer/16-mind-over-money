const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const db = require('../models');

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
	console.log('*** serializeUser called, user: ');
	done(null, user.id);
});

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
	console.log('DeserializeUser called');
	db.User.findById(id).then(user => {
		if (user) done(null, user);
		else done({ error: "Error"}, null);
	}).catch(err => console.log(err));
});

//  Use Strategies 
passport.use(LocalStrategy);

module.exports = passport;