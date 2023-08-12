const {createUserPersistence} = require("./authPersistence");

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