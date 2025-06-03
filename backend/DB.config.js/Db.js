const mysql2 = require('mysql2/promise');
require('dotenv').config();

const pool = mysql2.createPool({
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    user: process.env.USER,
    port: process.env.DB_PORT, // Use DB_PORT for MySQL, not PORT for Express
    connectionLimit: 10
});

console.log('Database pool created');

// Check database connection on startup (promise style)
pool.query('SELECT 1')
    .then(() => {
        console.log('Database connected successfully!');
    })
    .catch((err) => {
        console.error('Database connection failed:', err.message);
    });

async function query(sql, params) {
    const [rows] = await pool.execute(sql, params);
    return rows;
}

module.exports = {
    pool,
    query
};