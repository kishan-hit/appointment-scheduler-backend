var express = require('express');
var mongoose = require('mongoose');
var user = require("./user.js");
const Schema = mongoose.Schema;

// Schema
const doctorAvailabilitySchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
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

const DoctorAvailability = new mongoose.model("doctorAvailability", doctorAvailabilitySchema)
module.exports = DoctorAvailability