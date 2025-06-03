const express = require('express');
const dot = require('dotenv');
const { pool } = require('./DB.config.js/Db');
const employeerouter = require('./route/employee.route'); // <-- Make sure this is the right path
// const router = require('./route/index.js'); // <-- Make sure this is the right path
dot.config();
const installRoute = require('./route/install.route');

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(installRoute);
app.use(employeerouter);

app.listen(PORT, (err) => {
    if (err) {
        console.log('Server is not running');
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});

module.exports = app;