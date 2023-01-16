const express = require("express");
const postsRouter = express.Router();
const { postsModel } = require("../Models/Posts.model");
const { authenticate } = require("../Middlewares/authenticate");
postsRouter.get("/", async (req, res) => {
    try {
        const posts = await postsModel.find()
        res.send(posts)
        
    } catch (err) {
        console.log(err);
        res.send({ "msg": "Something went wrong" })
    }
})

postsRouter.post("/",authenticate, async (req, res) => {
    const {title,body,userID} =req.body;
    const device=req.device.type;
    console.log(device);

    try {
        const data = new postsModel({
            userID:userID,
            title:title,
            body:body,
            device:device,

        })
        await data.save()
        res.send({success:true, msg:"post successfully created"})
        res.end()
    } catch (err) {
        console.log(err);
        res.send({ "msg": "Something went wrong" })
        res.end()
    }
})

postsRouter.delete("/delete",authenticate, async (req, res) => {
    const {_id,userID} =req.body;
    

    try {
        const data = await postsModel.findByIdAndDelete(_id)
        res.send({success:true, msg:"post deleted successfully"})
    } catch (err) {
        console.log(err);
        res.send({ "msg": "Something went wrong" })
    }
})
postsRouter.patch("/update",authenticate, async (req, res) => {
    const {_id,} =req.body;
    try {
        const data = await postsModel.findByIdAndUpdate({_id},req.body)
        res.send({success:true, msg:"post updated successfully"})
        res.end()
    } catch (err) {
        console.log(err);
        res.send({ "msg": "Something went wrong" })
        res.end()
    }
})


module.exports = { postsRouter }
