const mongoose = require('mongoose');

const dotenv = require("dotenv");

dotenv.config();
mongoose.set('strictQuery', false);

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongoose Connected");
        });
}

module.exports = connectDatabase;