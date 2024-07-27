const Blog_schema = require('../../models/Blog_schema')
const mongoose = require('mongoose')

module.exports = async (req, res) => {
    try {

        const { id } = req?.params;

        const blog = await Blog_schema.findOne(
            {
                _id: new mongoose.Types.ObjectId(id),
                status: {
                    $ne: "deleted"
                }
            }
        )

        return res.status(200).json(
            {
                success: true,
                message: "successfully get blog",
                blog
            }
        )

    } catch (error) {
        return res.status(400).json(
            {
                success: false,
                message: error?.message
            }
        )
    }
}