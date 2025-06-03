const mysql2 = require('mysql2/promise');
require('dotenv').config();

const dbconfig = mysql2.createPool({
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    user: process.env.USER,
    port: process.env.PORT,
    connectionlimt:10
});

const pool = mysql2.createPool(dbconfig)

console.log('Database pool created');

// Check database connection on startup
pool.query('SELECT 1', (err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Database connected successfully!');
    }
});

// function query(sql, params) {
//     return new Promise((resolve, reject) => {
//         pool.query(sql, params, (error, result) => {
//             if (error) {
//                 return reject(error);
//             } else {
//                 return resolve(result);
//             }
//         });
//     });
// }

 async function query(sql,params){
    const [rows,faileds]=await pool.execute(sql,params);;
    return rows;
 }

module.exports = {
    pool: pool.promise(),
    query
};