const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const Blog_schema = new Schema(
    {
        status: {
            type: String,
            default: "saved"
        },

        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        },

        title: {
            type: String,
            required: true
        },

        content: {
            type: String,
            required: true
        },

        author: {
            type: String,
            required: true
        },

        categories: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true
        }

    }, { timestamps: true }
)

module.exports = mongoose.model('blog', Blog_schema)