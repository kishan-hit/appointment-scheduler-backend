var express = require('express');
var router = express.Router();
var DoctorDetail = require("../models/doctorDetails.js")


router.post("/register-doctor",(req,res)=>{
    const {specialist,mobile,fee,experience,degree,address,email,name} = req.body;

    const doctorData = new DoctorDetail({
        specialist,
        mobile,
        fee,
        experience,
        degree,
        address,
        email,
        name
    })
    doctorData.save((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send({message: "Successfully Registered","data":data})
        }
    })
})

router.get('/get-doctor',async function(req,res){
    const doctors = await DoctorDetail.find();
    res.send({
        "doctors": doctors
    })
})
router.get('/doctorDetail',async function(req,res){
    const doctor = await DoctorDetail.findOne({email : req.query.email});
    res.send({
        "doctor": doctor
    })
})

module.exports = router;
