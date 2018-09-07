const db = require('../models');
const bCrypt = require('bcrypt-nodejs');

module.exports = {
  getUser: function (req, res) {
    if (req.user) {
      db.User.findOne({ where: { id: req.user.id } })
        .then(response => {
          res.json(response);
        });
    } else {
      res.json({ user: null })
    }
  },

  signup: function (req, res) {
    const { username, password } = req.body;
    req.body.password = bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    // ADD VALIDATION
    db.User.findOne({ where: { username: username } }).then(user => {
      if (user) res.json({ error: 'username taken' })
      else {
        db.User.create(req.body).then(newUser => {
          if (!newUser) return res.send({ message: "No new user for you!" });
          if (newUser) {
            res.json(newUser);
            Promise.all([
              db.Balance.create({ UserId: newUser.id }),
              db.Note.create({ UserId: newUser.id }),
              db.Expenses.create({
                UserId: newUser.id,
                month: req.body.month,
                year: req.body.year
              })
            ]).then(values => res.json(values))
              .catch(err => console.log(err));
          };
        })
      }
    })
  },

  login: function (req, res) {
    const { username } = req.body;
    db.User.findOne({ where: { username: username } }).then(user => {
      res.json(user);
    }).catch(err => console.log(err));
  },

  logout: function (req, res) {
    if (req.user) {
      req.session.destroy();
      res.send({ msg: 'logging out' })
    } else {
      res.send({ msg: 'no user to log out' })
    }
  },

  changePwOrUserName: function (req, res) {
    const { username, currentPassword, newPassword } = req.body;
    let responseObject = {};

    if (username && (!currentPassword || !newPassword)) {
      db.User.findOne({ where: { username: username } })
        .then(user => {
          if (user) {
            responseObject.error = 'Username taken.';
            res.json(responseObject);
          } else {
            db.User.update(
              { username: username },
              { where: { id: req.user.id } }
            ).then(() => {
              db.User.findOne({ where: { id: req.user.id } })
                .then(user => {
                  responseObject.user = user;
                  res.json(responseObject);
                })
            })
          }
        })
    }

    if (username && currentPassword && newPassword) {
      db.User.findOne({ where: { username: username } })
        .then(user => {
          //  if the name is taken, send a response:
          if (user) {
            responseObject.error = 'Username taken.';
            res.json(responseObject);
          }
          else {
            //  if the name is not taken, check the password:
            const isMatch = bCrypt.compareSync(currentPassword, req.user.password);
            if (isMatch) {
              //  if the pw is a match, update the user's username and password:
              const pw = bCrypt.hashSync(newPassword, bCrypt.genSaltSync(10), null);
              db.User.update(
                { password: pw, username: username },
                { where: { id: req.user.id } }
              ).then(response => {
                //  if the response is a 1, the update was a sucess
                responseObject.didUpdate = response[0];
                db.User.findOne({ where: { id: req.user.id } })
                  .then(user => {
                    //  Get the new user info and send the response:
                    responseObject.user = user;
                    res.json(responseObject);
                  })
                  .catch(err => res.send(err));
              })
            } else {
              //  if the password is not a match, send a response:
              responseObject.error = "Incorrect password."
              res.json(responseObject);
            }
          }
        }).catch(err => res.send(err));
    }

    if (!username && currentPassword && newPassword) {
      const isMatch = bCrypt.compareSync(currentPassword, req.user.password);
      if (isMatch) {
        const pw = bCrypt.hashSync(newPassword, bCrypt.genSaltSync(10), null);
        db.User.update(
          { password: pw },
          { where: { id: req.user.id } }
        ).then(response => {
          responseObject.pwChange = response[0];
          res.json(responseObject);
        })
          .catch(err => console.log(err));
      } else {
        responseObject.error = "Incorrect password.";
        res.json(responseObject);
      }
    }
  }

}