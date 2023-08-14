const express = require("express");
const router = express.Router();
const {editBlog, createBlog, deleteBlog} = require("./adminInteractor");
const {findBlogPersistence} = require("./adminPersistence");


router.get("editBlog", (req, res, next)=>{
    const {blogId} = req.body;
    const blog = findBlogPersistence(blogId);
    res.render("edit-blog", {
        title: blog.title,
        content: blog.content,
    })

})

router.post("/editBlog", (req, res, next)=>{
    const {title, content, blogId} = req.body;
    const updatedBlog = editBlog(title, content, blogId);
    res.redirect("/blogs");
})

router.get("/createBlog", (req, res, next)=>{
    res.render("admin/create")
})

router.post("/createBlog", async (req, res, next)=>{
    const {title, content, authorId} = req.body;
    console.log(title, content)
    console.log(req.user);
    const newBlog = await createBlog(title, content, req.user._id, req.user.name);
    // res.redirect(`/blog/${newBlog._id}`);
    res.redirect("/");

})

router.post("/deleteBlog", (req, res, next)=>{
    const {blogId} = req.body;
    deleteBlog(blogId);
    res.redirect("/")
})

module.exports = router;