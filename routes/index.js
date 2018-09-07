const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api.js");
const userRoutes = require("./user.js");
const adminRoutes = require("./admin.js");

// backend Routes
router.use("/admin", adminRoutes);
router.use("/api", apiRoutes);
router.use("/user", userRoutes);

// If no defined routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;