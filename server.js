require("dotenv").config()
const express = require("express")
const session = require("express-session")
const mongoose = require("mongoose")
const passport = require("passport")
const app= express()
const home = require("./routes/home")
const signUp = require("./routes/signUp")
const google = require("./routes/google")
const facebook = require("./routes/facebook")
const logged = require("./routes/logged")
const local = require("./routes/local")
const User = require("./models/User")
const blog = require("./routes/blog")

app.set("view engine", "ejs")
const URI = "mongodb+srv://ciao:ciao@cluster0.ogg8o.mongodb.net/mydb?retryWrites=true&w=majority" ;
mongoose.connect(URI, {useNewUrlParser:true, useUnifiedTopology:true})
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))
app.use(session({
    secret:"Your secret key",
    resave:true,
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(((user,done) => {
    done(null,user.id)
}))
passport.deserializeUser((id, done) => {
    // console.log(`id: ${id}`);
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      })
    });



 
app.use("/home", home,signUp,blog)
app.use("/",google,facebook,logged,local)
app.get("/",(req,res) => {
    res.redirect("/home")
})

app.listen(8000)