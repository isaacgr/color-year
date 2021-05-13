const express = require("express");
const router = express.Router();

router.get("/logout", (request, response) => {
  request.session.destroy((err) => {
    response.redirect("/"); //Inside a callback… bulletproof!
  });
});

module.exports = router;
