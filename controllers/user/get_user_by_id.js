const User_schema = require('../../models/User_schema');
const mongoose = require('mongoose')

module.exports = async (req, res) => {
    try {

        const user = await User_schema.findOne(
            {
                _id: new mongoose.Types.ObjectId(req?.userId),
                status: { $ne: "deleted" }
            }
        ).select('-password')

        return res.status(200).json(
            {
                success: true,
                message: "successfully found user",
                user
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