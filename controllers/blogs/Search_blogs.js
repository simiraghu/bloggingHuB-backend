const Blog_schema = require('../../models/Blog_schema');

module.exports = async (req, res) => {
    try {

        const { title, categories, page, size } = req?.query;

        let query = {
            title: {
                $regex: title,
                $options: 'i',
            },
            status: {
                $ne: "deleted"
            }
        }

        if (categories) {
            query = {
                categories,
                title: {
                    $regex: title,
                    $options: 'i',
                },
                status: {
                    $ne: "deleted"
                }
            }
        }

        const $skip = (page - 1) * 5

        const blogs = await Blog_schema.find(query).skip($skip).limit(size)

        const total = await Blog_schema.find(query).skip($skip).limit(size).countDocuments()

        return res.status(200).json(
            {
                success: true,
                message: "search successfully",
                blogs,
                total
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