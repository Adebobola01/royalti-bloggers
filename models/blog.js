const { ObjectId } = require("bson");
const {Schema, model} = require("mongoose");


const blogSchema = new Schema({
    author: {
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