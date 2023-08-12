const Blog = require("../../models/blog");

exports.getAllBlogPersistence = async()=>{
    const blogs = await Blog.find();
    return blogs;
}