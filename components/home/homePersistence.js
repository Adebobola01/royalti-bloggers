const Blog = require("../../models/blog");


exports.getBlogsPersistence = async({pageNum, NUMBER_PER_PAGE})=>{
    const totalBlogs = await Blog.find().countDocuments();
    const blogs = await Blog.find()
    .skip((pageNum - 1) * NUMBER_PER_PAGE)
    .limit(NUMBER_PER_PAGE);

    return {blogs, totalBlogs};
}
