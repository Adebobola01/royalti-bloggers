const express = require("express");
const router = express.Router();

const {getAllBlogInteractor} = require("./homeInteractor");

router.get("/", async(req, res, next)=>{
    // const blogs = await getAllBlogInteractor();
    // console.log(blogs);
    res.render("home", {
        pageTitle: "home"
    })
})

module.exports = router;