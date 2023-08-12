const User = require("../../models/user");
const flash = require("connect-flash");

exports.createUserPersistence = async(email, username, password)=>{
    const existingUser = await User.findOne({email: email});
    if(existingUser) {
        console.log("persistence err")
        throw new Error("email is already in use!");
    }

    console.log("new err")
    const newUser = await new User({
        email: email,
        password: password,
        username: username
    }).save();

    return newUser;
}