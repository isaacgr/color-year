const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { createUser } = require("../prisma/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
      const newUser = {
        external_id: profile.id,
        display_name: profile.displayName,
        external_type: profile.provider,
        email: profile.emails[0].value
      };
      try {
        createUser(newUser);
        return cb(null, profile);
      } catch (e) {
        console.log(e);
        return cb(e, profile);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});
