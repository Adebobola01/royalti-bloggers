//This file contains all database related codes

const Blog = require("../../models/blog");

exports.createBlogPersistence = async (title, content, authorId, authorName) =>{
    const newBlog = await new Blog({
        title: title,
        content: content,
        authorId: authorId,
        authorName: authorName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    }).save();
    return newBlog;
}

exports.deleteBlogPersistence = async (blogId)=>{
    try {
        const blog = await Blog.findByIdAndDelete(blogId);
        return blog;
    } catch (error) {
        throw new Error("could not delete post at this time, please try again later");
    }
}

exports.editBlogPersistence = async(updateTitle, updatedContent, blogId)=>{
    const blog = await Blog.findOne({_id: blogId});
    blog.title = updateTitle;
    blog.content = updatedContent;
    blog.updatedAt = Date.now();
    const updatedBlog = await blog.save();
    return updatedBlog;
}

exports.findBlogPersistence = async(blogId)=>{
    const blog = await Blog.findOne({_id: blogId});
    return blog;
}

exports.getAdminBlogs = async(userId)=>{
    const blogs = await Blog.find({authorId: userId});
    return blogs;
}