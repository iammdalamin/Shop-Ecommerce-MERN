const express = require("express");
const formidable = require("express-formidable");

const router = express.Router()

//middlewares
const { requireSignIn, isAdmin } = require("../middlewares/AuthVerify");

const { create,productAdd, list, photo, singleProduct } = require("../controllers/products");


router.post("/product", requireSignIn, formidable(), create)
router.post("/productAdd",requireSignIn,productAdd)

router.get("/list", list)
router.get("/product/:slug", singleProduct);


module.exports = router ;
