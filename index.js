const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const port = 8000
const app = express()
app.use(express.json())
// app.use(express.urlencoded())
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json())
app.use(cors())

// import temp from "./router/tempRouter.js"
var newUser = require("./router/userRouter.js")
var doctorAvailability = require("./router/doctorAvailabilityRouter.js")
var doctorAppointment = require("./router/doctorAppointmentRouter.js")
var doctorAvail = require("./router/doctorDetailsRouter.js")
var userDetail = require("./router/userDetailsRouter.js")

mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true
},()=>{ 
    console.log("DB connected")
})

app.use("/newuser",newUser)
app.use("/doctorAvailability",doctorAvailability)
app.use("/doctorAppointment",doctorAppointment)
app.use("/doctor",doctorAvail)
app.use("/user",userDetail)

// Schema
// const Schema = mongoose.Schema;
// const userSchema = new Schema({
//     name: String,
//     email: String,
//     password: String
// })

// const doctorAvailabilitySchema = new Schema({
//     id: Number,
//     user_id: {
//         type: Schema.Types.ObjectId,
//         ref: 'user'
//     },
//     date: {
//         type: Date,
//         required: true
//     },
//     start_time: {
//         type: Date,
//         required: true
//     },
//     end_time: {
//         type: Date,
//         required: true
//     },
// })

// Model
// const User = new mongoose.model("User", userSchema)


// Routes
// app.post("/login",(req,res)=>{
//     const {email,password} = req.body;
//     User.findOne({email: email},(err,user)=>{
//         if(user){
//             if(password === user.password){
//                 res.send({message: "login successfull", user: user})
//             }else{
//                 res.send({message: "Password didn't match"})
//             }
//         }else{
//             res.send({message: "user not registered"});
//         }
//     })
// })

// app.post("/register",(req,res)=>{
//     const {name,email,password} = req.body;
//     User.findOne({email:email},(err,user)=>{
//         if(user){
//             res.send({message: "User already registered"})
//         }
//         else{
//             const user = new User({
//                 name,
//                 email,
//                 password
//             })
//             user.save(err=>{
//                 if(err){
//                     res.send(err)
//                 }else{
//                     res.send({message: "Successfully Registered"})
//                 }
//             })
//         }
//     })
// })

app.get("/health",(req,res)=>{
    res.send("Up and running");
});

app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
})

