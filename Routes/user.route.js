const express = require("express");
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")
const usersRouter = express.Router();
const { usersModel } = require("../Models/Users.model");
require('dotenv').config()
usersRouter.post("/register", async (req, res) => {

       const {name,email,gender,password}=req.body;
       const userPresent= await usersModel.findOne({"email":email})
       if(userPresent?.email){
        res.send({ "msg": "User already exists!","isRegisterd":true});
       }else{
        try {
             bcrypt.hash(password,10,async(err,hash)=>{
               if(err){
                     res.send({msg:"something wrong!"})
               }else{
                  const newUser= new usersModel({
                     name:name,
                     email:email,
                     gender:gender,
                     password:hash
                     })
                     await newUser.save();
                     res.send({ msg: "User Created Successfully!" });
               }
             })
              
        } catch (err) {
         console.log(err);
         console.log("err");
         res.send({ msg:"something wrong" });
            
        }
       }
})

usersRouter.post("/login", async(req,res) => {
      const {email,password} = req.body
      const isPresent = await usersModel.findOne({email})
       console.log(isPresent)
      if(isPresent){
          const id = isPresent._id
          const hash_password = isPresent.password
          bcrypt.compare(password,hash_password, function(e,result){
              if(result== true){
                  const token = jwt.sign({userID:id},process.env.S_KEY)
                  res.send({Login:"login Success",token:token,isUser:true,data:isPresent})
              }else{
                res.send({Login:"login failed"})
              }
          })
               
    
        
    
      }else{
          res.send({msg:"Login Failed !",isUser:false})
    
      }
      
    })




module.exports = { usersRouter }
