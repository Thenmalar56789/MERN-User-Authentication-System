//define user schema(user sign up fields)

//import mongoose
const mongoose = require("mongoose");

//import validator
const validator = require("validator");  //to validate email,...

//import bcrypt
const bcrypt = require("bcryptjs");  //to hash password

//import jwt  
const jwt = require("jsonwebtoken");   //to create json web token to make server identify user details when user logged in

//user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter your username!"],
        max_length: [30, "Username cannot exceed 30 characters!"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please enter a valid email!"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"],
        min_length: [8, "Password must be at least 8 characters!"],
        unique: true,
        select: false, //when we query user from database, password field will not be returned by default. we have to explicitly select it if we want to get it. to not show or display ps to frontend
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password!"],
        min_length: [8, "Confirm password must be at least 8 characters!"],
        validate: {
            validator: function(confirmPs) {    //normal function is used because we need to use "this" keyword to access the password field of the user document.
                return confirmPs == this.password;
            },
            message: "Give correct confirm password!"  //like unique, required,... we can also give custom error message for our custom validation. this message will be shown when the validation fails.
        },
    },
    phoneNumber: {
        required: [true, "Please enter your phone number!"],
        type: String,
        validate: [validator.isMobilePhone, "Please enter a valid phone number!"],
    },
    
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    avatar: {
        public_id: String, //its the id of the image in cloudinary
        url: String, //its the url of the image in cloudinary
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordChangedAt: Date,
},
{timestamps: true},  //note time of all actions like acc. created, deleted,...
);

//hashing the password before saving user in database
userSchema.pre("save", async function () {   //async function refers to user document that is being saved in database.
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 12);    //10 - 12 is suitable. it refers to salt rounds.
    this.confirmPassword = undefined; //we dont want to save confirm password in database, we just want to use it for validation.    
});


