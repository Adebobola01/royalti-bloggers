//This file contains all database related codes

const Blog = require("../../models/blog");

exports.createBlogPersistence = async (title, content, authorId) =>{
    const newBlog = await new Blog({
        title: title,
        content: content,
        authorId: authorId
    }).save();
    return newBlog;
}

exports.deleteBlogPersistence = async (blogId)=>{
    const blog = await Blog.findOne({_id: blogId}).delete().save();
}

exports.editBlogPersistence = async(updateTitle, updatedContent, blogId)=>{
    const blog = await Blog.findOne({_id: blogId});
    blog.title = updateTitle;
    blog.content = updatedContent;
    const updatedBlog = await blog.save();
    return updatedBlog;
}

exports.findBlogPersistence = async(blogId)=>{
    const blog = await Blog.findOne({_id: blogId});
    return blog;
}