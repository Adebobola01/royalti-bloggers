const express = require("express");
const router = express.Router();
const {search} = require("./searchPersistence");


router.get("search", async(req, res, next)=>{
    const {searchParam} = req.body;
    const results = await search(searchParam);
    res.render("search", {
        blogs: results
    })
})

module.exports = router;