const {getAllBlogsPersistence} = require("./blogPersistence")
const {dateHandler} = require("../../util/dateHandler");
exports.getAllBlogsInteractor = async({pageNum, NUMBER_PER_PAGE})=>{
    const {blogs, totalBlogs} = await getAllBlogsPersistence({pageNum, NUMBER_PER_PAGE});
    const newBlogs = blogs.map(b => {
        const updateBlog = {
            ...b._doc,
            createdAt: dateHandler(b.createdAt)
        }
        console.log(updateBlog);
        return updateBlog;
    })
    return {blogs:newBlogs, totalBlogs};
}