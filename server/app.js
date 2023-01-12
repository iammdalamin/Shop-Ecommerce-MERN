const express = require("express")
const mongoose = require("mongoose")
const router = require("./src/routes/api.js")

const bodyParser = require("body-parser")
const cors = require("cors")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const rateLimit = require('express-rate-limit')
const hpp = require("hpp")
const xss = require("xss-clean")
const helmet  = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")


const app = new  express()

app.use(bodyParser.json())
app.use(cors())
app.use(hpp())
app.use(xss())
app.use(helmet())
app.use(mongoSanitize())

dotenv.config()

const limiter = rateLimit({ windowMS: 15 * 60 * 1000, max: 3000 })
app.use(limiter)



//Route Handle
app.use("/api/v1", router)

let OPTION = {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }

mongoose.connect(process.env.MONGODB_URL,OPTION,  (err) => {
    err ? console.log(err)
    :console.log("Server Connected");
})




module.exports=app