const User_schema = require('../../models/User_schema');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

module.exports = async (req, res) => {
    let success = false;

    try {

        const { email, password } = req?.body;
        const user_exists = await User_schema.findOne({ email, status: { $ne: "deleted" } })

        if (!user_exists) {
            return res.status(400).json(
                {
                    success,
                    message: "Invalid credential"
                }
            )
        }

        const isPassword = await bcrypt.compare(password, user_exists?.password)

        if (!isPassword) {
            return res.status(400).json(
                {
                    success,
                    message: "Invalid credential"
                }
            )
        }

        const token = await JWT.sign({ userId: user_exists?._id }, process.env.JWT_SECRET_KEY)

        return res.status(200).json(
            {
                success: true,
                message: "Login successfully",
                token
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