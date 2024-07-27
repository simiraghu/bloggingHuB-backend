const User_schema = require('../../models/User_schema');
const bcrypt = require('bcryptjs')

module.exports = async (req, res) => {
    try {

        const { current_password, new_password, confirm_password } = req?.body;
        const user = await User_schema.findOne({ _id: req?.userId })


        const isCurrentPassword = await bcrypt.compare(current_password, user?.password)

        if (!isCurrentPassword) {
            return res.status(400).json(
                {
                    success: false,
                    message: "current password is wrong"
                }
            )
        }

        if (new_password !== confirm_password) {
            return res.status(400).json(
                {
                    success: false,
                    message: "confirm password is wrong"
                }
            )
        }

        if (new_password.length < 4 || current_password.length < 4) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Password must be 4 charactor long"
                }
            )
        }

        const isConfirmPassword = await bcrypt.hash(confirm_password, 10)
        const change_password = await User_schema.findByIdAndUpdate(req?.userId, { password: isConfirmPassword })

        return res.status(200).json(
            {
                success: true,
                message: "successfully changed password",
                change_password
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