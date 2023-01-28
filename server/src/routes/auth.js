const express = require("express")
const { registration, updateProfile, login } = require("../controllers/users")
const {requireSignIn} = require("../middlewares/AuthVerify")
const router = express.Router()


router.post("/registration", registration)
router.get("/login", login)
router.post("/updateProfile",requireSignIn, updateProfile)

module.exports = router ;
