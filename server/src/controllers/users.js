const  jwt  = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/auth");
const UserModel = require("../models/UserModel");


exports.registration = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;
        if (!name.trim()) {
            return res.json({error:"Name is required"})
        }
        if (!email) {
            return res.json({
                error:"Email is required"
            })
        }
        if (!password || password.length<6) {
            return res.json({
                error:"Password must be at least 6 characters long"
            })
        }

        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.json({
                error:"Email is taken"
            })
        }
        const hashedPassword = await hashPassword(password)

        const user = await new UserModel({
            name,
            email,
            address,
            password:hashedPassword
        }).save()

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn:"7d",
        })

        res.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                address:user.address
            },
            token

        })

    } catch(err) {
        console.log(err);
  }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return  res.json({
                error:"Enter a valid email"
            })
        }
        if (!password || password.length < 6) {
            return  res.json({
                error:"Password must be at least 6 characters long"
            })
        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.json({
                error:"User not found"
            })
        }

        const match = await comparePassword(password, user.password)
        if (!match) {
            return  res.json({
                error:"Password incorrect"
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn:"7d"
        })
        
        res.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                address:user.address
            },
            token

        })

    } catch (err) {
        console.log(err);
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const { name, password, address } = req.body;
        const user = await UserModel.findById(req.user._id)
        console.log(user);
    } catch (err) {
        console.log(err);
    }
}