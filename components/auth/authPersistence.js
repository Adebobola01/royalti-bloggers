const User = require("../../models/user");

exports.createUserPersistence = async(email, name, password)=>{
    const existingUser = await User.findOne({email: email});
    if(existingUser) {
        throw new Error("email is already in use!");
    }

    const newUser = await new User({
        email: email,
        password: password,
        name: name
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