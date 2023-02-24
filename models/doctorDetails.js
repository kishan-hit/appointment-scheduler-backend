var express = require('express');
var mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const doctorDetailSchema = new Schema({
    address:{
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    fee: {
        type: Number,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    specialist: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

const DoctorDetail = new mongoose.model("doctorDetail", doctorDetailSchema)
module.exports = DoctorDetail