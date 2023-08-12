const {createUserPersistence, loginPersistence} = require("./authPersistence");

exports.createUserInteractor = async(email, password, username)=>{
    try {
        const user = await createUserPersistence(email, username, password);
        return user;
    } catch (error) {
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