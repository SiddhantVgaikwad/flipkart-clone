const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middlewares/error');
const paymentRoutes = require('./routes/stripPay');
const cors = require('cors')

const app = express();

// config






//middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(cors({
    origin: 'https://flipkart-clone-9anj.onrender.com', // Replace with your frontend URL
    credentials: true, // This is crucial!
}));

//routes
const user = require('./routes/userRoute');
const product = require('./routes/productRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');


app.use('/api/v1', user);
app.use('/api/v1', product);
app.use('/api/v1', order);
app.use('/api/v1', payment);
app.use('/api/v1/payment', paymentRoutes);

// error middleware
app.use(errorMiddleware);

module.exports = app;
