const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const Post = require("../models/Post")

function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()) {
       next()
    }
    else{
       res.redirect("/")
    }
}
router.get("/blog",ensureAuthenticated, (req,res) => {
    res.render("blog.ejs")
})
router.post("/blog/post",ensureAuthenticated,(req,res) => {
    console.log(req.user)
    let currentUser = req.user.username
    let new_post = new Post({
        author:currentUser,
        title:req.body.title,
        description:req.body.description
    })
    new_post.save((err,doc) => {
        if(err) throw err
    })

    res.redirect("/home/blog/all-posts")
})
router.get("/blog/all-posts",ensureAuthenticated, async(req,res) => {
    let posts = await Post.find({})
    let currentUser = req.user.username
    res.render("post.ejs", {posts:posts, currentUser : currentUser})
})
  router.get("/blog/all-posts/edit",ensureAuthenticated,(req,res) => {
//     Post.findOne({description:req.body.description}, (err,post) => {
//         if(err) throw err
//         console.log(post)
//        let postToChange = post
//        console.log(postToChange)
//         //  res.render("edit.ejs", {post:postToChange })
//      })



    res.render("edit.ejs", {id:req.query.id,description:req.query.description,title:req.query.title,author:req.query.author})
})
router.post("/blog/all-posts/save",ensureAuthenticated,(req,res) => {
    let title = req.body.title
    let id = req.body.id
    console.log(id)
    let author = req.body.author
    let description = req.body.description
    Post.findByIdAndUpdate(id,{title:title,description:description}, (err,doc) => {
        if(err) throw err
        console.log(doc)
    })
    res.redirect("/home/blog/all-posts")
})
router.post("/blog/all-posts/delete",ensureAuthenticated, (req,res) => {
    Post.findByIdAndRemove(req.body.id, (err,doc) => {
        if(err) throw err
        console.log("Removed post " + doc )
    })
    res.redirect("/home/blog/all-posts")
})
module.exports = router