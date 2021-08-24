const express = require("express")
const passport = require("passport")
const User = require("../models/User")
const FacebookStrategy = require("passport-facebook")
const router = express.Router()
passport.use(new FacebookStrategy({
    clientID: process.env.APP_ID,
    clientSecret: process.env.APP_SECRET,
    callbackURL: "http://localhost:8000/auth/facebook/callback",
    profileFields: ["id", "displayName"]
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id}, function (err, user) {
        // const name = profile.displayName
        //  let new_user = new User({
        //     name:name
        //   })
        //   if(!User.findOne({facebookId: profile.id})){
        //       new_user.save()
        //   }
        user.username = profile.displayName
        user.save()
        return cb(err,user)
    });
  }
  ));
router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/logged');
  });

module.exports = router