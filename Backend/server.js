//load env variables and start server

//import app
const app = require('./app');

//import dotenv
const dotenv = require('dotenv');

//import mongodb
const connectDB = require("./database");

//load env variables
dotenv.config({ path: "./config/config.env" });

//connect server to mongodb
connectDB();

//alternate port
const PORT = process.env.PORT || 5000;

//start server
const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});