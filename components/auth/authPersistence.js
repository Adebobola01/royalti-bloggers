const User = require("../../models/user");

exports.createUserPersistence = async(email, username, password)=>{
    const existingUser = await User.findOne({email: email});
    if(existingUser) {
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

exports.loginPersistence = async({email, password})=>{
    const user = await User.findOne({email: email});
    return user;
}

exports.getUserHash = async({email})=>{
    const user = await User.findOne({email: email});
    return user.password;
}