var express = require('express');
var router = express.Router();
var UserDetail = require("../models/userDetails.js")


router.post("/register-user",(req,res)=>{
    const {mobile,gender,age,address,email} = req.body;

    const userData = new UserDetail({
        mobile,gender,age,address,email
    })
    userData.save((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send({message: "Successfully Registered","data":data})
        }
    })
})

router.get('/get-user',async function(req,res){
    const users = await UserDetail.find();
    res.send({
        "users": users
    })
})
router.post('/userDetail',async function(req,res){

    const user = await UserDetail.findOne({email : req.body.email});
    res.send({
        "user": user
    })
})

module.exports = router;
