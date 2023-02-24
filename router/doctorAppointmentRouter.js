var express = require("express")
var router = express.Router();
var DoctorAppointment = require("../models/doctorAppointment.js");
var DoctorAvailability = require("../models/doctorAvailability.js")

// router.post("/",(req,res)=>{

//     const { user_id,doctor_id,date,start_time,end_time } = req.body;
//     var ndate = new Date(date);
//     var tdate = ndate.toISOString().substring(0, 10)
//     DoctorAppointment.findOne({user_id,doctor_id,date:tdate,start_time,end_time},(err,doctorAppointment)=>{
//         if(doctorAppointment){
//             res.send({message: "Already registered"})
//         }
//         else{
//             const doctorAppointment = new DoctorAppointment({
//                 user_id,
//                 doctor_id,
//                 date:tdate,
//                 start_time,
//                 end_time
//             })
//             doctorAppointment.save((err,data)=>{
//                 if(err){
//                     res.send(err)
//                 }else{
//                     res.send({message: "Successfully Registered","data":data})
//                 }
//             })
//         }
//     })
// })
// function getDate(date){
//     return date.getDate()+"-"+date.getMonth()+"-"+date.getYear();
// }
router.post("/book-appointment",async(req,res)=>{
    const {userEmail,doctorEmail,start_time,end_time} = req.body
    const deletedSlot = await DoctorAvailability.deleteOne({email : doctorEmail,start_time})
    const newAppointment = new DoctorAppointment({
        user_email : userEmail,
        doctor_email : doctorEmail,
        start_time,
        end_time
    })
    newAppointment.save((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send({message: "Successfully Added Appointment","data":data})
        }
    })
})
router.post("/get-all-appointment",async(req,res)=>{
    const appointments = await DoctorAppointment.find({doctorEmail : req.body.email})
    res.send({"appointments" : appointments})
})

module.exports = router