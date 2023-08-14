const express = require("express");
const router = express.Router();
const NUMBER_PER_PAGE = 2;
const {getBlogsPersistence} = require("./homePersistence");

router.get("/", async(req, res, next)=>{
    const pageNum = +req.query.page || 1;
    const {blogs, totalBlogs} = await getAllBlogInteractor({pageNum, NUMBER_PER_PAGE});
    console.log(blogs);
    res.render("home", {
        pageTitle: "home",
        totalBlogs: totalBlogs,
        blogs: blogs,
        numOfPages: Math.ceil(totalBlogs / NUMBER_PER_PAGE),
        currentPage: pageNum
    })
})

module.exports = router;