//define auth routes like signup, login, logout, forgot password, reset password, update password

//import express
const express = require("express");

//import router from express
const router = express.Router();  //router is like a mini express application. we can define routes in it and then export it to use in our main app.js file. it helps us to keep our code organized and modular.

//import authController for logic of every route
const authController = require("../controller/authController.js");  //authController will contain the logic for handling the signup, login, logout, forgot password, reset password, update password functionalities. we will define these functions in authController.js file and then import it here to use in our routes. this way we can keep our code organized and modular.

//defining routes 

//for signup 
router.post("/signup", authController.signup);  // / is base-url, /signup is the endpoint for signup route. when user sends a POST request to /api/v1/auth/signup, this route will be hit and the signup function from authController will be executed to handle the signup logic. we will define the signup function in authController.js file. this function will take care of creating a new user in the database and sending a response back to the client. we will also handle errors in this function and send appropriate error messages back to the client if something goes wrong during the signup process.
//authController.signup is the function that will be executed when this route is hit. we will define this function in authController.js file. this function will take care of creating a new user in the database and sending a response back to the client. we will also handle errors in this function and send appropriate error messages back to the client if something goes wrong during the signup process.
//for login
router.post("/login");   
//for logout
router.post("/logout");
