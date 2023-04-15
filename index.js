const express = require("express");
const app = express()
const cors = require("cors")
const helmet = require("helmet");
require("dotenv").config()
const cookieParser = require("cookie-parser")

const jwtVerify = require("./middleware/jwtVerify")
const corsOptions = require("./config/corsOptions");

const connectMongo = require("./config/connDB")

app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/api/auth/v4",require("./routes/userAuth.route"))
app.use("/api/question",jwtVerify,require("./routes/question.route"))
app.use("/api/answer",jwtVerify,require("./routes/answer.route"))
app.use("/api/all_queries",jwtVerify,require("./routes/allQueries.route"))
app.use("/user",jwtVerify,require("./routes/user.route"))

app.listen(process.env.PORT,async ()=>{
    await connectMongo();
    console.log(`server is running on PORT ${process.env.PORT} http://localhost:3500`)
})