var express = require("express")
var mongoose = require("mongoose")
var user = require("./user.js")
var doctor = require("./doctorAvailability.js")
const Schema = mongoose.Schema;

const doctorAppointmentSchema = new Schema({
    user_email: {
        type: String,
        required : true
    },
    doctor_email: {
        type: String,
        required: true
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
})

const DoctorAppointment = new mongoose.model("doctorAppointment",doctorAppointmentSchema)
module.exports = DoctorAppointment