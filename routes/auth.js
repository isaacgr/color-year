const passport = require("passport");
const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require("connect-ensure-login");

// @desc Auth with google
// @route GET /auth/google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// @desc google auth callback
// @route GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (request, response) => {
    response.redirect("/dashboard");
  }
);

router.get("/user", ensureLoggedIn("/"), (request, response) => {
  response.send({ authenticated: true });
});

module.exports = router;
