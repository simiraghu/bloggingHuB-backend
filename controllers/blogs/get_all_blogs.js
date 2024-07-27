const Blog_schema = require('../../models/Blog_schema');

module.exports = async (req, res) => {
    const { categories, page, size } = req?.query;
    let query = { status: { $ne: "deleted" } }

    try {


        if (categories) {
            query = {
                categories,
                status: { $ne: "deleted" }
            }
        }

        let blogs, count, total;


        if (categories && page && size) {
            const $skip = (page - 1) * size
            blogs = await Blog_schema.find(query).skip($skip).limit(size)
            count = await Blog_schema.countDocuments(query)

        } else {

            const $skip = (page - 1) * size
            console.log($skip)

            blogs = await Blog_schema.find(query).skip($skip).limit(size)
            count = await Blog_schema.find(query).skip($skip).limit(size).countDocuments()
            total = await Blog_schema.countDocuments(query)
        }

        return res.status(200).json(
            {
                success: true,
                message: "successfully found all the blogs",
                blogs,
                count,
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