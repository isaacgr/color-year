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
  const user = await prisma.user.findUnique({
    where: {
      external_id: request.user
    },
    select: {
      id: true,
      palette_set: true
    }
  });
  response.send({
    authenticated: true,
    userId: user.id,
    paletteSet: user.palette_set
  });
});

module.exports = router;
