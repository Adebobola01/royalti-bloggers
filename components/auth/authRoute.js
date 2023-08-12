const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const {createUserInteractor, loginInteractor} = require("./authInteractor");


router.get("/signup", (req, res, next)=>{
    res.render("auth/signup", {
        pageTitle: "Signup",
        errMsg: req.flash("signupErr")
    })
})


router.post("/signup", async(req, res, next)=>{
    const {email, username, password} = req.body;
    const hash = await bcrypt.hash(password, 10)
    try {
        await createUserInteractor(email, hash, username);
    } catch (error) {
        req.flash("signupErr", error.message);
        return res.redirect("/signup");
    }
    res.redirect("/login")
})

router.get("/login", (req, res, next)=>{
    res.render("auth/login", {
        pageTitle: "Login",
        errMsg: req.flash("loginErr")
    });
})

router.post("/login", async (req, res, next)=>{
    const {email, password} = req.body;

    try {
        const user = await loginInteractor({email});
        const hash = user.password;
        const isEqual = await bcrypt.compare(password, hash);
        if(!isEqual){
            throw new Error("invalid password, please try again!");
        }
        req.session.isLoggedIn = true;
        req.session.user = user;
    } catch (error) {
        req.flash("loginErr", error.message);
        console.log(error)
        return res.redirect("/login");
    }
    res.redirect("/");
})
module.exports = router;