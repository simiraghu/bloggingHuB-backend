const mongoose = require('mongoose')
const { Schema } = require('mongoose')


const User_schema = new Schema(
    {
        status: {
            type: String,
            default: "saved"
        },

        username: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        phonenumber: {
            type: Number,
            required: true
        }

    }, { timestamps: true }
)

module.exports = mongoose.model('User', User_schema)