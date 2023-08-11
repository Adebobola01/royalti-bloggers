const {Schema,model} = require("mongoose");


const commentSchema = new Schema({
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    commenter: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = model("Comment", commentSchema);