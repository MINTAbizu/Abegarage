const express = require('express');
const dot = require('dotenv');
const { pool } = require('./DB.config.js/Db');
const router = require('./route/install.route');
dot.config();

const PORT = process.env.PORT ;

const app = express();

// Middleware to parse JSON
app.use(express.json());

//query to check database connection
// pool.query('SELECT 1')
//     .then(() => {
//         console.log('Database connected successfully! (from App.js)');
//     })
//     .catch((err) => {
//         console.error('Database connection failed: (from App.js)', err.message);
//     });
// // Basic test route
// app.get('/', (req, res) => {
//     res.send('API is running...');
// });

app.use(router)

app.listen(PORT, (err) => {
    if (err) {
        console.log('Server  is not   running');
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});


module.exports = app; // Export the app for testing or other purposes

