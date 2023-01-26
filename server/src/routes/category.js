

const express = require("express") ;
const { create } = require("../controllers/category") ;

const router = express.Router();

// middlewares
const { requireSignIn, isAdmin } = require("../middlewares/AuthVerify");



router.post("/category", requireSignIn, isAdmin, create);

module.exports = router ;
