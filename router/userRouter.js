var express = require('express');
var router = express.Router();
var User = require("../models/user.js")


router.post("/register",(req,res)=>{
    const {name,email,password,role} = req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message: "User already registered"})
        }
        else{
            const user = new User({
                name,
                email,
                password,
                role
            })
            user.save((err,data)=>{
                if(err){
                    console.log(err)
                    res.send(err)
                }else{
                    console.log(data);
                    res.send({message: "Successfully Registered","data":data})
                }
            })
        }
    })
})

router.post("/login",(req,res)=>{
    const {email,password} = req.body;
    User.findOne({email: email},(err,user)=>{
        if(user){
            if(password === user.password){
                res.send({message: "login successfull", user: user})
            }else{
                res.send({message: "Password didn't match"})
            }
        }else{
            res.send({message: "user not registered"});
        }
    })
})

router.get('/login',async function(req,res){
    const user = await User.findOne({email: "kk@gmail.com"});
    res.send({
        "user": user
    })
})

module.exports = router;
