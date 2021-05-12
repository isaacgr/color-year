const { ensureLoggedIn } = require("connect-ensure-login");
const express = require("express");
const router = express.Router();

router.get("/logout", (request, response) => {
  request.session = null;
  request.logout();
  response.redirect("/");
});

module.exports = router;
