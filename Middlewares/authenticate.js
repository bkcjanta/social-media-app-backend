require('dotenv').config()
const jwt = require("jsonwebtoken")
const authenticate = (req,res,next) =>{
    var token = req.headers?.authorization?.split(" ")[1]
    if(token){
        jwt.verify(token, process.env.S_KEY, function(e,decoded){
            if(decoded){
                req.body.userID = decoded.userID
                next()
            }else{
                res.send({msg:"Token Is Wrong!"})
            }
        })
    }else{
        res.send({Failed:"Please login again !"})
    }
}

module.exports = {authenticate}