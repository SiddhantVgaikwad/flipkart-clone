const cloudinary = require('cloudinary');
const app = require('./app');
const connectDatabase = require('./config/database');
const PORT = process.env.PORT ;
const path = require('path')


// UncaughtException Error
process.on('uncaughtException', (err) => {  
    console.log(`Error: ${err.message}`);
    process.exit(1);
});




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});




const server = app.listen(PORT, () => {
    connectDatabase();
    console.log(`Server running on http://localhost:${PORT}`)
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});
