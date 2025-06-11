const express = require('express');
const dot = require('dotenv');
const { pool } = require('./DB.config.js/Db');
const router = require('./route/index.js');
const cors = require('cors');
const PORT = process.env.PORT;

const app = express();
// https://abegarage-xq8a.onrender.com

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
    origin: process.env.VITE_API_URL,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Mount all routes through the main router with /api prefix
app.use('/api', router);

app.listen(PORT, (err) => {
    if (err) {
        console.log('Server is not running');
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});

module.exports = app;