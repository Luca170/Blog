const express = require("express")
const passport = require("passport")
const User = require("../models/User")
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy
const router = express.Router()
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret:process.env.GOOGLE_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      user.username = profile.displayName
      user.save()
      return done(err, user);
    });
}
));
router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/logged');
  });
module.exports = router