const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
    let token = req.headers["token"]

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.json({
                err:"Unauthorized"
            })
        } else {
            let email = decoded
            ["data"]
            req.headers.email = email
            next()
        }
    })
}