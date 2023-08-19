const express = require("express");
const router = express.Router();
const {editBlog, createBlog, deleteBlog} = require("./adminInteractor");
const {findBlogPersistence, getAdminBlogs} = require("./adminPersistence");


router.get("/createBlog", (req, res, next)=>{
    const reqFlash = req.flash("createError");
    res.render("admin/create", {
        title: "Create",
        blogTitle: "",
        blogContent: "",
        formAction: "/createBlog",
        errMsg: reqFlash.length > 0 ? reqFlash : "",
    })
})

router.post("/createBlog", async (req, res, next)=>{
    try {
        const {title, content} = req.body;
        await createBlog(title, content, req.user);
        res.redirect(`/admin/profile/${req.user._id}`);
    } catch (error) {
        await req.flash("createError", error.message);
        res.redirect("/admin/createBlog");
    }

})

router.get("/edit/:blogId", async(req, res, next)=>{
    const reqFlash = req.flash("editError");
    const {blogId} = req.params;
    const blog = await findBlogPersistence(blogId);
    res.render("admin/create", {
        title: "Edit",
        blogTitle: blog.title,
        blogContent: blog.content,
        formAction: `/admin/edit/${blogId}`,
        errMsg: reqFlash.length > 0 ? reqFlash : "",
    })
})

router.post("/edit/:blogId", async(req, res, next)=>{
    const {title, content} = req.body;
    const {blogId} = req.params;
    try {
        await editBlog({title, content, blogId, user:req.user});
    } catch (error) {
        await req.flash("editError", error.message);
        return res.redirect(`/admin/edit/${blogId}`);
    }
    res.redirect(`/admin/profile/${req.user._id}`);
})

router.get("/delete/:blogId", async(req, res, next)=>{
    const {blogId} = req.params;
    try {
       await deleteBlog({blogId, user: req.user});
    } catch (error) {
        await req.flash("deleteError", error.message);
    }
    res.redirect(`/admin/profile/${req.user._id}`);
});

router.get("/profile/:userId", async(req, res, next)=>{
    const reqFlash = req.flash("deleteError");
    const {userId} = req.params;
    const blogs = await getAdminBlogs(userId);
    res.render("admin/profile", {
        user: req.session.user,
        blogs: blogs,
        errMsg: reqFlash.length > 0 ? reqFlash : "",
    })
})

module.exports = router;