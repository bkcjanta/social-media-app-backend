const express = require("express")
const cors = require("cors");
require("dotenv").config()
const { connect } = require("./Config/db")
const {postsRouter}=require("./Routes/posts.route")
const {usersRouter} =require("./Routes/user.route")
var device = require('express-device');
const app = express()
app.use(device.capture()); 
app.use(express.json())
app.use(cors({
    origin: "*",
}))

app.use("/posts",postsRouter);
app.use("/users",usersRouter);

app.listen(process.env.PORT, async () => {
    try {
        await connect()
        console.log("DB is Connected to Sucessssfully....");
        console.log(`http://localhost:${process.env.PORT}`);

    } catch (e) {
        console.log("DB is connected to failed!!!!!")
    }

})