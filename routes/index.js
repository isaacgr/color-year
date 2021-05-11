const express = require("express");
const router = express.Router();

// @desc Login/Landing page
// @route GET /
// router.get("/", (request, response) => {
//   response.send("Login");
// });

// @desc Dashboard page
// @route GET /dashboard
router.get("/dashboard", (request, response) => {
  response.send("Dashboard");
});

router.get("/logout", (request, response) => {
  request.session = null;
  request.logout();
  request.redirect("/");
});

module.exports = router;
