const Blog_schema = require("../../models/Blog_schema");

module.exports = async (req, res) => {
    let success = false;

    try {
        const { title, content, author, image, categories } = req?.body;

        if (!title || title?.length < 4) {
            return res.status(400).json(
                {
                    success,
                    message: "Title must be 4 charactor long"
                }
            )
        }

        if (!content) {
            return res.status(400).json(
                {
                    success,
                    message: "Content required"
                }
            )
        }

        if (!image) {
            return res.status(400).json(
                {
                    success,
                    message: "Image required"
                }
            )
        }

        if (!categories) {
            return res.status(400).json(
                {
                    success,
                    message: "Categories required"
                }
            )
        }

        if (!author) {
            return res.status(400).json(
                {
                    success,
                    message: "Author required"
                }
            )
        }

        const blog = await Blog_schema.create({ title, content, image, author, categories, userId: req?.userId })

        return res.status(200).json(
            {
                success: true,
                message: "successfully created blog",
                blog
            }
        )

    } catch (error) {
        return res.status(400).json(
            {
                success,
                message: error?.message
            }
        )
    }
}