const express = require("express");
const router = express.Router();
const NUMBER_PER_PAGE = 2;
const {getAllBlogsPersistence, getBlogPersistence} = require("./blogPersistence");

router.get("/", async(req, res, next)=>{
    try {
        const pageNum = +req.query.page || 1;
        const {blogs, totalBlogs} = await getAllBlogsPersistence({pageNum, NUMBER_PER_PAGE});
        const numArray = Array.from({length: Math.ceil(totalBlogs / NUMBER_PER_PAGE)}, ()=> "");
        res.render("home", {
            pageTitle: "home",
            totalBlogs: totalBlogs,
            blogs: blogs,
            numOfPages: Math.ceil(totalBlogs / NUMBER_PER_PAGE),
            currentPage: pageNum,
            numArray: numArray,
            searchParam: ""
        })
    } catch (error) {
        console.log(error);
    }
})

router.get("/blog/:blogId", async(req, res, next)=>{
    const {blogId} = req.params;
    const blog = await getBlogPersistence({blogId});
    res.render("blog/blog-details", {
        pageTitle: "Details",
        blog: blog,
    })
})

module.exports = router;