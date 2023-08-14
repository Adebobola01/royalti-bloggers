const express = require("express");
const router = express.Router();
const NUMBER_PER_PAGE = 2;
const {getBlogsPersistence} = require("./homePersistence");

router.get("/", async(req, res, next)=>{
    try {
        const pageNum = +req.query.page || 1;
        const {blogs, totalBlogs} = await getBlogsPersistence({pageNum, NUMBER_PER_PAGE});
        const numArray = Array.from({length: Math.ceil(totalBlogs / NUMBER_PER_PAGE)}, ()=> "");
        console.log(pageNum)

        console.log(numArray);
        res.render("home", {
            pageTitle: "home",
            totalBlogs: totalBlogs,
            blogs: blogs,
            numOfPages: Math.ceil(totalBlogs / NUMBER_PER_PAGE),
            currentPage: pageNum,
            numArray: numArray,
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;