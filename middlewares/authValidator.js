const {body, check} = require("express-validator");

const validateSignUp = [check("email").trim().isEmail().withMessage("Please enter a valid email!").toLowerCase(), check("password").trim().not().isEmpty(), check("username").trim().isLength({min: 3}).withMessage("Username must be atleast 3 characters")];
module.exports = validateSignUp;