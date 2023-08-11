const {createBlogPersistence, deleteBlogPersistence, editBlogPersistence} = require("./adminPersistence");


exports.createBlog = (title, content, authorId) =>{
    const createdBlog = createBlogPersistence(title, content, authorId);
}

exports.deleteBlog = async(blogId)=>{
    await deleteBlogPersistence(blogId)
}

exports.editBlog = async (title, content, blogId)=>{
    const updatedBlog = await editBlogPersistence(title, content, blogId);
    return updatedBlog;
}