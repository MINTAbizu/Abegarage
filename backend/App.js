const express = require('express');
const dot = require('dotenv');
const { pool } = require('./DB.config.js/Db');
const employeerouter = require('./route/employee.route'); // <-- Make sure this is the right path
const router = require('./route/index.js'); // <-- Make sure this is the right path
dot.config();
const installRoute = require('./route/install.route');
// const employeerouter2 = require('./route/employee.route');
const customerroute=require('./route/customer.route.js')



const cors = require('cors');
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for CORS


// app.use(employeerouter2);
// app.use(cors(corsOptions));
const corsOptions = {
    origin: process.env.VITE_API_URL,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(installRoute);
app.use(employeerouter);
app.use(router);
app.use(customerroute)

app.listen(PORT, (err) => {
    if (err) {
        console.log('Server is not running');
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});

module.exports = app;