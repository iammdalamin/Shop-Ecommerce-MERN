const express = require("express")
const { registration, login, updateProfile } = require("../controllers/users")
const AuthVerify = require("../middlewares/AuthVerify")
const router = express.Router()


router.post("/registration", registration)
router.get("/login", login)
router.post("/updateProfile",AuthVerify, updateProfile)

module.exports = router