const User_schema = require('../../models/User_schema')
const Blog_schema = require('../../models/Blog_schema')

module.exports = async (req, res) => {

    try {

        const user = await User_schema.findByIdAndUpdate({ _id: req?.userId }, { status: "deleted" })

        const blogs = await Blog_schema.updateMany(
            {
                userId: user?.id
            },
            {
                $set: {
                    status: "deleted"
                }
            }
        )

        return res.status(200).json(
            {
                success: true,
                message: "successfully deleted",
                user,
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