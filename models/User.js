const express = require("express")
const mongoose = require("mongoose")
const findOrCreate = require("mongoose-findorcreate")
let userSchema = new mongoose.Schema({
    username:String,
    password:String,
    googleId:{required:false, type:String},
    facebookId: {required:false, type:String},
})
userSchema.plugin(findOrCreate)
module.exports = mongoose.model("User", userSchema)