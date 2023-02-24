var express = require('express');
var mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        default: 'user',
        enum: ["user","doctor"]
    }
})

const User = new mongoose.model("user", userSchema)
module.exports = User