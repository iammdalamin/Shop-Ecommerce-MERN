const express = require("express");
const formidable = require("express-formidable");

const router = express.Router()

//middlewares
const { requireSignIn, isAdmin } = require("../middlewares/AuthVerify");

const { create, list, photo, singleProduct } = require("../controllers/products");


router.post("/product", requireSignIn, isAdmin, formidable(), create)

router.get("/list", list)
router.get("/product/photo/:productId", photo);
router.get("/product/:slug", singleProduct);


module.exports = router ;
