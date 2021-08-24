const express = require("express")
const router = express.Router()

function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()) {
       next()
    }
    else{
       res.redirect("/")
    }
}
router.get("/logged",ensureAuthenticated,(req,res) => {
    res.render("logged")
})
router.get("/logout",(req,res) => {
    req.logout()
    res.redirect("/")
})
module.exports = router