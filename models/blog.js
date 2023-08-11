const {Schema, model} = require("mongoose");


const blogSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = model("Blog", blogSchema);