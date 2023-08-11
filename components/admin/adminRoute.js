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

module.exports = router;