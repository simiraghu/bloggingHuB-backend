const Blog_schema = require("../../models/Blog_schema");

module.exports = async (req, res) => {

    try {
        const { page, size } = req?.query;

        const $skip = (page - 1) * size

        const blogs = await Blog_schema.find(
            {
                userId: req?.userId,
                status: {
                    $ne: "deleted"
                }
            }
        ).skip($skip).limit(size)

        const total = await Blog_schema.find(
            {
                userId: req?.userId,
                status: {
                    $ne: "deleted"
                }
            }
        ).countDocuments()

        return res.status(200).json(
            {
                success: true,
                message: "successfully get blogs",
                blogs,
                total
            }
        )

    } catch (error) {
        return res.status(400).json(
            {
                sucess: false,
                message: error?.message
            }
        )
    }
}