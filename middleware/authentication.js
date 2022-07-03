const jwt = require("jsonwebtoken");


const authentication = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            console.log(req.headers.authorization);
            console.log(authentication);
            return res.status(403).json({
                success: false,
                message: "not login"
            })
        }
        const token = req.headers.authorization.split(" ").pop();
        jwt.verify(token, process.env.SECRET, (err, result) => {
            
            console.log(err);
            console.log(result);
            if (err) {
                res.status(403).json({
                    success: false,
                    message: "the token is invalid or expired"
                })
            } else {
                req.token = result
                next()
            }
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "server Error",
            err: err.message
        })
    }
};

module.exports = authentication