const express = require("express");
const router = express.Router();
const {editBlog, createBlog, deleteBlog} = require("./adminInteractor");
const {findBlogPersistence, getAdminBlogs} = require("./adminPersistence");


router.get("/edit/:blogId", async(req, res, next)=>{
    const {blogId} = req.params;
    const blog = await findBlogPersistence(blogId);
    console.log(blog);
    res.render("admin/create", {
        title: "Edit",
        blogTitle: blog.title,
        blogContent: blog.content,
    })
})

router.post("/edit/:blogId", async(req, res, next)=>{
    try {
        const {title, content, blogId} = req.body;
        const updatedBlog = await editBlog(title, content, blogId);
    } catch (error) {
        console.log(error);
    }
    res.redirect(`/admin/profile/${req.user._id}`);
})

router.get("/createBlog", (req, res, next)=>{
    res.render("admin/create", {
        title: "Create"
    })
})

router.post("/createBlog", async (req, res, next)=>{
    const {title, content, authorId} = req.body;
    console.log(title, content)
    console.log(req.user);
    const newBlog = await createBlog(title, content, req.user._id, req.user.name);
    res.redirect(`/admin/profile/${req.user._id}`);

})

router.get("/delete/:blogId", async(req, res, next)=>{
    const {blogId} = req.params;
    try {
       await deleteBlog(blogId);
    } catch (error) {
        req.flash("deleteError", error.message);
    }
    res.redirect(`/admin/profile/${req.user._id}`);
});

router.get("/profile/:userId", async(req, res, next)=>{
    const {userId} = req.params;
    const blogs = await getAdminBlogs(userId);
    console.log(userId);
    res.render("admin/profile", {
        user: req.user,
        blogs: blogs,
    })
})

module.exports = router;