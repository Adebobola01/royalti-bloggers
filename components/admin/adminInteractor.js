//This file contain all the business logic of the app

const {createBlogPersistence, deleteBlogPersistence, editBlogPersistence} = require("./adminPersistence");


exports.createBlog = async(title, content, author) =>{
    try {

        //checks to validate blog title and content

        if(title.length < 3){
            throw new Error("Title can't be less than 3 characters");
        }
        else if(content.length < 5) throw new Error("Blog content can't be less than 3 characters");

        return await createBlogPersistence(title, content, author._id, author.name);

    } catch (error) {
        throw error;
    }
}

exports.deleteBlog = async(blogId)=>{
    try {
        const deletedBlog = await deleteBlogPersistence(blogId);
        return deletedBlog;
    } catch (error) {
        throw error;
    }
}

exports.editBlog = async (title, content, blogId)=>{
    const updatedBlog = await editBlogPersistence(title, content, blogId);
    return updatedBlog;
}