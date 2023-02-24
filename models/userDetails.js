var express = require('express');
var mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const userDetailSchema = new Schema({
    address:{
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const UserDetail = new mongoose.model("userDetail", userDetailSchema)
module.exports = UserDetail