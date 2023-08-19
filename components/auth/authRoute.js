const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const {createUserInteractor, loginInteractor} = require("./authInteractor");


router.get("/signup", (req, res, next)=>{
    res.render("auth/auth", {
        pageTitle: "Signup",
        pageHeader: "Register",
        formAction: "/signup",
        errMsg: req.flash("signupErr")
    })
})


router.post("/signup", async(req, res, next)=>{
    const {email, name, password} = req.body;
    const hash = await bcrypt.hash(password, 10)
    try {
        await createUserInteractor(email, hash, name);
    } catch (error) {
        req.flash("signupErr", error.message);
        return res.redirect("/signup");
    }
    res.redirect("/login")
})

router.get("/login", (req, res, next)=>{
    const reqFlash = req.flash("loginErr");
    res.render("auth/auth", {
        pageTitle: "Login",
        pageHeader: "Login",
        formAction: "/login",
        errMsg: reqFlash.length > 0 ? reqFlash : "",
    });
})

router.post("/login", async (req, res, next)=>{
    const {email, password} = req.body;
    const user = await loginInteractor({email});
    try {
        const hash = user.password;
        const isEqual = await bcrypt.compare(password, hash);
        if(!isEqual){
            throw new Error("invalid password, please try again!");
        }
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save();
    } catch (error) {
        await req.flash("loginErr", error.message);
        return res.redirect("/login");
    }
    res.redirect(`admin/profile/${user._id}`);
})

router.get("/logout", async(req, res, next) => {
    try {
        await req.session.destroy()
        res.redirect("/login");
    } catch (error) {
        console.log(err);
    }
});

module.exports = router;