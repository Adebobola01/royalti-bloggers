const Blog = require("../../models/blog");


exports.getAllBlogsPersistence = async({pageNum, NUMBER_PER_PAGE})=>{
    const totalBlogs = await Blog.find().countDocuments();
    const blogs = await Blog.find()
    .skip((pageNum - 1) * NUMBER_PER_PAGE)
    .limit(NUMBER_PER_PAGE).exec();

    return {blogs, totalBlogs};
}

exports.getBlogPersistence = async({blogId})=>{
    const blog = await Blog.findById(blogId);
    return blog;
}