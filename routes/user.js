const router = require('express').Router();
const passport = require('../passport');
const userController = require('../controllers/userController');

router.route('/')
  .get(userController.getUser)
  .post(userController.signup);

router.post('/login', passport.authenticate('local'), userController.login);

router.post('/logout', userController.logout);

router.post('/change', userController.changePwOrUserName);

module.exports = router;