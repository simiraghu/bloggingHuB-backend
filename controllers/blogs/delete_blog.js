const Blog_schema = require('../../models/Blog_schema')

module.exports = async (req, res) => {

    try {

        const { id } = req?.params;

        const blog = await Blog_schema.findByIdAndUpdate(id, { status: "deleted" }, { new: true })

        return res.status(200).json(
            {
                success: true,
                message: "successfully deleted",
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