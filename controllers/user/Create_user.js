const User_schema = require('../../models/User_schema');
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {

    let success = false;
    try {

        const { username, email, password, phonenumber } = req?.body;

        if (!username || username?.length < 4) {
            return res.status(400).json(
                {
                    success,
                    message: "User name must be atleast 4 charactor"
                }
            )
        }

        const user_exists = await User_schema.findOne({ email })

        if (user_exists) {
            return res.status(400).json(
                {
                    success,
                    message: "This user is already exists"
                }
            )
        }

        if (!email) {
            return res.status(400).json(
                {
                    success,
                    message: "Email is required"
                }
            )
        }


        if (!phonenumber || phonenumber?.length < 10) {
            return res.status(400).json(
                {
                    success,
                    message: "Phone number should be 10 numbers"
                }
            )
        }

        const hash_password = await bcrypt.hash(password, 10)

        if (!password || password?.length < 4) {
            return res.status(400).json(
                {
                    success,
                    message: "Password must be atleast 4 charactor long"
                }
            )
        }

        const user = await User_schema.create(
            {
                username,
                email,
                password: hash_password,
                phonenumber
            }
        )

        return res.status(200).json(
            {
                success: true,
                message: "successfully created user",
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