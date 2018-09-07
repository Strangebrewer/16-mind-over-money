const db = require("../models");
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');

const strategy = new LocalStrategy(
	{
		usernameField: 'username' // 'username' is default
	},
	function (username, password, done) {
		const isValidPassword = function (userpass, password) {
			return bCrypt.compareSync(password, userpass);
		}

		db.User.findOne({
			where: { username: username }
		}).then(user => {
			if (!user) {
				return done(null, false, { message: 'Incorrect username' });
			}
			if (!isValidPassword(user.password, password)) {
				return done(null, false, { message: 'Incorrect password' });
			}
			return done(null, user);
		})
		.catch(err => console.log(err));
	}
)

module.exports = strategy; 