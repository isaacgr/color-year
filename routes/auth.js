const passport = require("passport");
const express = require("express");
const router = express.Router();

// @desc Auth with google
// @route GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// @desc google auth callback
// @route GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (request, response) => {
    response.redirect("/dashboard");
  }
);

module.exports = router;
