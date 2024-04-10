require('dotenv').config();
const { DB_CONNECT } = process.env;
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connection = async () => {
    try {
        await mongoose.connect(DB_CONNECT);
        console.log("Connection made successfully with MongoDB");
    }
    catch (err) {
        console.log("Error occurred during DB connection!");
    }
}


module.exports = connection;