const {getAllBlogPersistence} = require("./homePersistence");


exports.getAllBlogInteractor = async()=>{
    const blogs = await getAllBlogPersistence();
    return blogs;
}