const Blog_schema = require('../../models/Blog_schema');

module.exports = async (req, res) => {
    try {

        const { id } = req?.params;
        const update_data = req?.body;

        const blogs = await Blog_schema.findByIdAndUpdate(
            id,
            update_data,
            {
                status: {
                    $ne: "deleted"
                },
                new: true
            }
        )

        return res.status(200).json(
            {
                success: true,
                message: "successfully updated",
                blogs
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