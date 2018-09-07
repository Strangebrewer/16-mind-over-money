const router = require('express').Router();
const adminController = require('../controllers/adminController');

router.route("/expenses")
  .get(isLoggedIn, adminController.getExpenses);

router.route("/credit/:card")
  .get(isLoggedIn, adminController.getCcRecords);

router.route("/checking")
  .get(isLoggedIn, adminController.getAllChecking);

router.route("/detail/:category")
  .get(isLoggedIn, adminController.getDetailRecords);

router.route("/ccspend")
  .get(isLoggedIn, adminController.getCCSpend);

router.route("/balance/change")
  .put(isLoggedIn, adminController.changeBalances);

router.route("/user/balances")
  .get(isLoggedIn, adminController.getUserAndBalances);

router.route("/note")
  .put(isLoggedIn, adminController.updateNote);

router.route("/note/detail")
  .put(isLoggedIn, adminController.updateDetailNote);

router.route("/detail/delete")
  .put(isLoggedIn, adminController.deleteDetailRecord);

router.route("/checking/delete")
  .put(isLoggedIn, adminController.deleteCheckingRecord);

router.route("/cc/delete")
  .put(isLoggedIn, adminController.deleteCcRecord);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.json({ isAuthenticated: false });
}

module.exports = router;