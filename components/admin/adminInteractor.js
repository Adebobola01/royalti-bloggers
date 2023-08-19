//This file contain all the business logic of the app

const {createBlogPersistence, deleteBlogPersistence, editBlogPersistence, findBlogPersistence} = require("./adminPersistence");


exports.createBlog = async(title, content, author) =>{
    try {

        //checks to validate blog title and content

        if(title.length < 3){
            throw new Error("blog title can't be less than 3 characters");
        }
        else if(content.length < 5) throw new Error("Blog content can't be less than 5 characters");

        return await createBlogPersistence(title, content, author._id, author.name);

    } catch (error) {
        throw error;
    }
}

exports.editBlog = async ({title, content, blogId, user})=>{
    try {
        const blog = await findBlogPersistence(blogId);
        if(blog.authorId.toString() !== user._id.toString() || !user ){
            throw new Error("User is not authorized to edit blog");
        }

        if(title.length < 3){
            throw new Error("blog title can't be less than 3 characters");
        }
        else if(content.length < 5) throw new Error("Blog content can't be less than 5 characters");

        await editBlogPersistence(title, content, blogId);
    } catch (error) {
        throw error;
    }
}

exports.deleteBlog = async({blogId, user})=>{
    try {
        const blog = await findBlogPersistence(blogId);
        if(!user || user._id !== blog.authorId){
            throw new Error("User isn't authorized to delete blog");
        }
        const deletedBlog = await deleteBlogPersistence(blogId);
    } catch (error) {
        throw error;
    }
}
