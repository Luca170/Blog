const express = require("express")
const mongoose = require("mongoose")

let postSchema = new mongoose.Schema({
    author : String,
    title: String,
    description:String
})

module.exports = mongoose.model("Post", postSchema)