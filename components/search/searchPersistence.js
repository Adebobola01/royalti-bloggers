const Blog = require("../../models/blog");

exports.search = async(searchParam)=>{
    const blogs = await Blog.find((blog)=> (
        blog.title.contain(searchParam)
    ))
    return blogs;
}