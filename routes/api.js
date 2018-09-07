const router = require('express').Router();
const apiController = require('../controllers/apiController');

// Matches with '/setup/names'
router.route('/setup/names')
  .get(isLoggedIn, apiController.getAccountNames)
  .post(isLoggedIn, apiController.setupNames);

router.route('/setup/balances')
  .post(isLoggedIn, apiController.setupBalances)

router.route('/balances')
  .get(isLoggedIn, apiController.getBalances);

router.route('/finances/:month/:year')
  .get(isLoggedIn, apiController.getFinances);

router.route('/expenses/:month/:year')
  .get(isLoggedIn, apiController.getExpenses)
  .put(isLoggedIn, apiController.updateExpenses);

router.route('/savings/:month/:year')
  .put(isLoggedIn, apiController.updateSavings);

router.route('/ccpayment/:month/:year')
  .post(isLoggedIn, apiController.creditCardPayment);

router.route('/cccharge/:month/:year')
  .post(isLoggedIn, apiController.creditCardCharge);

router.route('/checking')
  .put(isLoggedIn, apiController.savingsToChecking);

router.route('/checking/:month/:year')
  .post(isLoggedIn, apiController.updateChecking);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.json({ isAuthenticated: false });
}

module.exports = router;
