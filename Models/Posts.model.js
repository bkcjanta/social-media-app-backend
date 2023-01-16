const mongoose = require('mongoose');
const postsSchema = mongoose.Schema({
    userID: { type: String, required: true },   
    title: { type: String, required: true },   
    body: { type: String, required: true },
    device: { type: String, required: true },
    

})

const postsModel=mongoose.model("post",postsSchema);
module.exports={postsModel};