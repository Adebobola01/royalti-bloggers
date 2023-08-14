//This file contain all the business logic of the app

const {createBlogPersistence, deleteBlogPersistence, editBlogPersistence} = require("./adminPersistence");


exports.createBlog = async(title, content, authorId, authorName) =>{
    const createdBlog = await createBlogPersistence(title, content, authorId, authorName);
}

exports.deleteBlog = async(blogId)=>{
    await deleteBlogPersistence(blogId)
}

exports.editBlog = async (title, content, blogId)=>{
    const updatedBlog = await editBlogPersistence(title, content, blogId);
    return updatedBlog;
}