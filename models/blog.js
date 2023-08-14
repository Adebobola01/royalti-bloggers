const {Schema, model} = require("mongoose");


const blogSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true
    },
    tag: {
        type: String,
        default: "Blog post",
        required: false
    }
})

module.exports = model("Blog", blogSchema);