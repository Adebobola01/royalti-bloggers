const express = require("express");
const router = express.Router();
const validateSignUp = require("../middlewares/authValidator");
const {validationResult} = require("express-validator");

router.post("/signup", (req, res, next)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(422).json({message: "user validation failed", error: errors})
    }

    const {username, password, email} = req.body;
    console.log(username, password, email, req.body);
    res.status(201).json({message: "success", username, password, email});
})

router.get("/signup", (req, res, next)=>{
    res.render("auth/signup", {
        pageTitle: "Signup"
    })
})

module.exports = router;