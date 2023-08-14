const Blog = require("../../models/blog");

exports.search = async({searchParam, NUMBER_PER_PAGE, page})=>{
    const blogs = await Blog.find();
    const filteredBlog = blogs.filter(function(b){
        let title = b.title.toString().toLowerCase();
        if(title.includes(searchParam)){
            return b;
        }
    })
    const start = (NUMBER_PER_PAGE * Number(page)) - NUMBER_PER_PAGE;   
    const end = start + NUMBER_PER_PAGE;                                           
    const blogsToRender = filteredBlog.slice(start, end);
    const totalBlogs = filteredBlog.length;

    return {blogsToRender, totalBlogs};
}