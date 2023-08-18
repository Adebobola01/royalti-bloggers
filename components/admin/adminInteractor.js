//This file contain all the business logic of the app

const {createBlogPersistence, deleteBlogPersistence, editBlogPersistence, findBlogPersistence} = require("./adminPersistence");


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

exports.editBlog = async ({title, content, blogId, user})=>{
    try {
        const blog = await findBlogPersistence(blogId);
        if(blog.authorId !== user._id || !user ){
            throw new Error("User is not authorized to edit blog");
        }
        await editBlogPersistence(title, content, blogId);
    } catch (error) {
        throw error;
    }
}