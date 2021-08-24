const express = require("express")
const bcrypt = require("bcrypt")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("../models/User")
const router = express.Router()
passport.use(new LocalStrategy(
    function (username, password, done) {
     User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!bcrypt.compareSync(password, user.password)) { 
          return done(null, false);
        }
        return done(null, user);
      });
    }
  ));

router.post("/auth", (req,res,next) => {
    const hash = bcrypt.hashSync(req.body.password,12)
    let new_User = new User({
        username: req.body.username,
        password:hash
    })

    User.findOne({username:req.body.username}, (err,user) => {
        if(err){
            next(err)
        }
        else if(user) {
            res.redirect("/login")
        }
        else {
            new_User.save((err,doc) => {
                if(err) throw err
                console.log(doc)
                res.redirect("/login")
            })
        }
    })
 })
 router.get("/login",(req,res) => {
     res.render("login.ejs")
 })
 router.post("/login/auth",passport.authenticate("local", {failureRedirect:"/login"}), (req,res) => {
    res.redirect("/logged")
})
module.exports = router