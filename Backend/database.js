//import mongoose and connect mongodb

//import mongoose
const mongoose = require("mongoose");

//connect mongodb
const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI).then((con) => {  //then() is executed if mongodb is connected. what is con? con is the connection object returned by mongoose.connect() if the connection is successful. it contains information about the connection, such as the host, port, and database name.
        console.log(`MongoDB is connected! Host: ${con.connection.host}`);
    }).catch((err) => {   //catch((err)) is used to catch any error if mongodb connection fails.
            console.log(`MongoDB connection failed! Error: ${err}`);
        });
};


//export connectDB
module.exports = connectDB;