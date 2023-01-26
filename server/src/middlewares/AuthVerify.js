const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");


  exports.requireSignIn = (req, res, next) => {
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

 exports.isAdmin = async (req, res, next) => {
     try {
         const email = req.headers.email;
         const user = await UserModel.findOne({email:email});
         console.log("user==>", req.headers.email);
        if (user.role !== 1) {
            return res.json({
                status: 401,
                message:"Unauthorized"
            })
        } else {
            next()
        }

    } catch (err) {
        console.log(err);
    }
 }


