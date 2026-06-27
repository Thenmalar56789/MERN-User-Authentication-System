//create express and middleware

//import express
const express = require('express');

//create express app
const app = express();

//import middleware (cors)
const cors = require('cors');

//use middleware
app.use(cors());   //Allow frontend to access backend 
app.use(express.json());  //Converts incoming JSON request body into JavaScript object. Because Express can’t read JSON automatically. it parses json data from req body.
app.use(express.urlencoded({ extended:true }));   //Reads form data sent from frontend

//testing req runs on server
app.get("/", (req, res) => {
    res.send("Response sent!");   //link: http://localhost:8000/
});

//export app(modern format of module.exports is export default app; but we will use module.exports for compatibility with older versions of Node.js)
module.exports = app;  //we export app to so that other files can use it or access it.

