const express = require('express');
const app = express();
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const db = require("./models");
const bodyParser = require('body-parser');
const routes = require('./routes');
const PORT = process.env.PORT || 8080;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
} else { app.use(express.static(path.join(__dirname, 'client/public'))); }

// For Passport 
app.use(session({
  secret: 'buddha has money',
  resave: true,
  saveUninitialized: true,
  maxAge: null
})); // session secret 
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Add routes
app.use(routes);

db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
}); 