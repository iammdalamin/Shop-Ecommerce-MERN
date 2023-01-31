const  jwt  = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/auth");
const UserModel = require("../models/UserModel");


exports.registration = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;
        if (!name.trim()) {
            return res.json({status:400,
                error:"Name is required"})
        }
        if (!email) {
            return res.json({
                status:400,

                error:"Email is required"
            })
        }
        if (!password || password.length<6) {
            return res.json({
                status:400,
                error:"Password must be at least 6 characters long"
            })
        }

        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.json({
                status:400,

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


// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         if (!email) {
//             return res.json({
//                 status:400,
//                 error:"Enter an email"
//             })
//         }
//         if (!password || password.length < 6) {
//             return res.json({
//                 status:400,

//                 error:"Password must be at least 6 characters long"
//             })
//         }

//         const user = await UserModel.findOne({ email })
//         if (!user) {
//             return res.json({
//                 status:400,

//                 error:"User not found"
//             })
//         }

//         const match = await comparePassword(password, user.password)
//         if (!match) {
//             return res.json({
//                 status:400,

//                 error:"Password incorrect"
//             })
//         }

//         const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//             expiresIn:"7d"
//         })
        
//         res.json({
//             status: 200,
//             user: {
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//                 address:user.address
//             },
//             token,
//             user

//         })

//     } catch (err) {
//         console.log(err);
//     }
// }

// exports.updateProfile = async (req, res) => {
//     try {
//         const { name, password, address } = req.body;
//         // const user = await UserModel.findById(req.user._id)
//         console.log(req.headers["token"]);
//         if (password && password.length < 6) {
//             return res.json({
//                 error: "Password is required and should be min 6 characters long",
//               });
//         }

//         const hashedPassword = password ? await hashPassword(password) : undefined
        
//         const updated = await UserModel.findByIdAndUpdate(
//             req.user._id,
//             {
//                 name: name || user.name,
//                 password: hashedPassword || user.password,
//                 address:address||user.address
//             },
//             {new:true}
//         )

//         updated.password = undefinedres.json(updated)
//     } catch (err) {
//         console.log(err);
//     }
// }


exports.login = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email) {
        return res.json({
            status:400,
            error: "Enter an email"
        })
    }
    if (!password || password.length < 6) {
        return res.json({
            status:400,

            error: "Password must be at least 6 characters long"
        })
    }

    UserModel.findOne({ email }, (err, data) => {
        try {
            if (!err) {
                console.log("Data=>"+data);
                const match = comparePassword(password, data.password)
                console.log("Match" + match);
                if (!match) {
                    res.json({
                        status:400,
    
                        error:"Password is incorrect"
                    })
                } else {
                    let Payload = { exp: Math.floor(Date.now() / 1000) * (24 * 60 * 60), data: data["email"] }
                    let token = jwt.sign(Payload, process.env.JWT_SECRET)
                    res.json({
                        status:200,
    
                        message: "Login Success",
                        data:data,
                        token
                    })
                }
           }
        } catch {
                res.json({
                    status:400,
    
                   error:"User not found"
                })
            console.log("Error=> "+ err);
        }
       
    })
}
   
exports.updateProfile = (req, res) => {

    let email = req.headers['email'];
    let reqBody = req.body;
console.log(req.headers['email']);
    UserModel.updateOne({ email: email }, reqBody, (err, data) => {
        if (err) {
            res.status(400).json({
                status: "Fail to Update",
                data:err
            })
        } else {
            res.status(200).json({
                status: "Updated Successfull",
                data: data
            })
        }
    })
    
}