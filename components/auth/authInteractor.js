const {createUserPersistence, loginPersistence} = require("./authPersistence");

exports.createUserInteractor = async(email, password, username)=>{
    try {
        const user = await createUserPersistence(email, username, password);
        console.log(user)
        return user;
    } catch (error) {
        console.log("int err")
        throw error;
    }
}

exports.loginInteractor = async({email, password})=>{
    try {
        const user = await loginPersistence({email, password});
        return user;
    } catch (error) {
        throw error;
    }
}