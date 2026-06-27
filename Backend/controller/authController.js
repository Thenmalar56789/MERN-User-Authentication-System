//logic for every routes

//import userSchema        
const User = require("../models/user");   //we import userSchema here because we need to create a user document in the database when a user signs up and we need to find a user document in the database when a user logs in.

//import jwt
const jwt = require("jsonwebtoken"); 

//import sendToken
const sendToken = require("../utils/sendToken.js");

//import reusable pre-defined try catch block to handle errors in async functions
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");

//During signup, get details from user and validate. exports.signup is a controller function that will be executed when the /signup route is hit. this function will take care of creating a new user in the database and sending a response back to the client. we will also handle errors in this function and send appropriate error messages back to the client if something goes wrong during the signup process. we will define this function as an async function because we will be doing some asynchronous operations like saving user in database and generating token. we will use await to wait for these operations to complete before sending a response back to the client. we will also wrap this function with catchAsyncErrors to handle any errors that may occur during the execution of this function and send appropriate error messages back to the client.
exports.signup = catchAsyncErrors( async (req, res) => {   //this curly bracket is for the function body of the async function. We close this after async and await fully. 
    //async function because we will be doing some asynchronous operations(ops that take time to finish) like saving user in database and generating token.  
    const { username, email, password, confirmPassword, phoneNumber } = req.body; //we get these details from the request body that the client sends when they hit the /signup route. we will use these details to create a new user in the database. we will also validate these details using the validation rules defined in the userSchema. if any of the validation fails, an error will be thrown and we will catch that error and send an appropriate error message back to the client.

//avatar is optional, so use let.
let avatar = {};  //we will store the avatar details in this object. if the user uploads an avatar, we will store the public_id and url of the avatar in this object. if the user does not upload an avatar, we will keep this object empty and it will be stored as an empty object in the database. we will also set a default avatar for the user in the userSchema, so if the user does not upload an avatar, the default avatar will be used.

//creating user using await to validate, store user in db and send response.
const user = await User.create({     //when this line runs, current async func of saving user pauses and mongoose perform ops like validating user details, saving hashed ps, save user to db and send res. so we use await here. after these ops are completed, the async func of saving user resumes and we can send response back to client. 
    username,
    email,
    password,
    confirmPassword,
    phoneNumber,
    avatar,  //its a trailing comma, keep it for multi-line objects.
}
);

//sendToken
sendToken(user, 200, res);  //we send the token to the client after successful signup. we will define the sendToken function in a separate file called sendToken.js in the utils folder. this function will take care of generating a token for the user and sending it back to the client in the response.
});  //localhost:4000/api/v1/auth/signup is the endpoint for signup route. when user sends a POST request to this endpoint, this route will be hit and the signup function from authController will be executed to handle the signup logic. we will define the signup function in authController.js file. this function will take care of creating a new user in the database and sending a response back to the client. we will also handle errors in this function and send appropriate error messages back to the client if something goes wrong during the signup process.