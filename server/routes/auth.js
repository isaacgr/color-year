const passport = require("passport");
const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require("connect-ensure-login");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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

router.get("/user", ensureLoggedIn("/"), async (request, response) => {
  const userId = await prisma.user.findUnique({
    where: {
      external_id: request.user
    },
    select: {
      id: true
    }
  });
  response.send({ authenticated: true, userId: userId.id });
});

module.exports = router;
