const express = require("express");
const router = express.Router();
const {search} = require("./searchPersistence");
const NUMBER_PER_PAGE = 2;


router.post("/search", async(req, res, next)=>{
    const {searchParam} = req.body;
    // const pageNum = +req.query.page || 1;
    // const {blogs, totalBlogs} = await search({searchParam, pageNum, NUMBER_PER_PAGE});
    // const numArray = Array.from({length: Math.ceil(totalBlogs / NUMBER_PER_PAGE)}, ()=> "");
    // console.log(results)
    res.redirect(`/search?s=${searchParam}&page=${1}`);
})

router.get("/search", async(req, res, next)=>{
    let {page, s} = req.query;
    const {blogsToRender, totalBlogs} = await search({searchParam:s, page, NUMBER_PER_PAGE});
    const numArray = Array.from({length: Math.ceil(totalBlogs / NUMBER_PER_PAGE)}, ()=> "");
    res.render("home", {
        pageTitle: "Search",
        totalBlogs: totalBlogs,
        blogs: blogsToRender,
        searchParam: s,
        numOfPages: Math.ceil(totalBlogs / NUMBER_PER_PAGE),
        currentPage: +page,
        numArray: numArray,
    })
})

module.exports = router;