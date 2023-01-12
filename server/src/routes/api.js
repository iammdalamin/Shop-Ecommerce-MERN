const express = require("express")
const { registration, login, updateProfile } = require("../controllers/users")
const router = express.Router()


router.post("/registration", registration)
router.get("/login", login)
router.post("/updateProfile", updateProfile)

module.exports = router