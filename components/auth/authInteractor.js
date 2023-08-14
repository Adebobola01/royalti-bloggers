const {createUserPersistence, loginPersistence} = require("./authPersistence");

exports.createUserInteractor = async(email, hash, name)=>{
    try {
        const user = await createUserPersistence(email, name, hash);
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