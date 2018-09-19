const router = require('express').Router();
const apiController = require('../controllers/apiController');

// Matches with '/setup/names'
router.route('/setup/names')
  .get(isLoggedIn, apiController.getAccountNames)
  .post(isLoggedIn, apiController.setupNames);

router.post('/setup/balances', isLoggedIn, apiController.setupBalances)

router.get('/balances', isLoggedIn, apiController.getBalances);

router.get('/finances/:month/:year', isLoggedIn, apiController.getFinances);

router.route('/expenses/:month/:year')
  .get(isLoggedIn, apiController.getExpenses)
  .put(isLoggedIn, apiController.updateExpenses);

router.put('/savings/:month/:year', isLoggedIn, apiController.updateSavings);

router.post('/ccpayment/:month/:year', isLoggedIn, apiController.creditCardPayment);

router.post('/cccharge/:month/:year', isLoggedIn, apiController.creditCardCharge);

router.put('/checking', isLoggedIn, apiController.savingsToChecking);

router.post('/checking/:month/:year', isLoggedIn, apiController.updateChecking);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.json({ isAuthenticated: false });
}

module.exports = router;
