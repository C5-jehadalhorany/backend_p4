const usersModel = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const login = (req, res) => {
    const password = req.body.password;
    const email = req.body.email
    usersModel.findOne({ email }).then(async (result) => {
        if (!result) {
            return res.status(404).json({
                success: false,
                message: `The email doesn't exist`,
            })

        }
        try {
            const valid = await bcrypt.compare(password, result.password);
            if (!valid) {
                return res.status(403).json({
                    success: false,
                    message: `The password you’ve entered is incorrect`,
                });
            }
            const payload = {
                userId: result._id
                
            };
            const options = {
                expiresIn: "60m",
            };
            const token =await jwt.sign(payload, process.env.SECRET, options);
            res.status(200).json({
                success: true,
                message: `Valid login credentials`,
                token: token,
            });
        } catch (error) {
            throw error
        }
    })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: `Server Error`,
                err: err
            });
        })
}




module.exports = {
    login
}