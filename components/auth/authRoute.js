const express = require("express");
const router = express.Router();

const {createUserInteractor} = require("./authInteractor");

router.get("/signup", (req, res, next)=>{
    res.render("auth/signup", {
        pageTitle: "Signup",
        errMsg: req.flash("signupErr")
    })
})


router.post("/signup", async(req, res, next)=>{
    const {email, username, password} = req.body;
    let result;
    try {
        result = await createUserInteractor(email, password, username);
    } catch (error) {
        req.flash("signupErr", error.message);
        return res.redirect("/signup");
    }
    res.render("auth/login")
})

router.get("/login", (req, res, next)=>{
    res.render("auth/login");
})

module.exports = router;