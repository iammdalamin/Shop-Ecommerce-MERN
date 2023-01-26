const express = require("express");
const formidable = require("express-formidable");

const router = express.Router()

//middlewares
const { requireSignIn, isAdmin } = require("../middlewares/AuthVerify");

const { create, list } = require("../controllers/products");


router.post("/product", requireSignIn, isAdmin, formidable(), create)

router.get("/list", requireSignIn, list)

module.exports = router ;
