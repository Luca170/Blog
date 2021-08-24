const express = require("express")
const router = express.Router()


router.get("/", (req,res)=> {
    let bool
    if(req.isAuthenticated()) {
        bool = false
    }
    else {
        bool = true
    }
    res.render("home.ejs", {signUp:bool})
})

module.exports = router