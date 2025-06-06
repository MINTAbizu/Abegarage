const { pool } = require('../DB.config.js/Db');

// Check if customer exists by email
async function checkCustomerExists(email) {
    const query = 'SELECT * FROM customer_identifier WHERE customer_email = ?';
    const result = await pool.query(query, [email]);
    const rows = Array.isArray(result[0]) ? result[0] : [];
    return rows.length > 0;
}

// Create a new customer
async function createCustomer(params) {
    const {
        customer_email,
        customer_phone_number,
        customer_first_name,
        customer_last_name,
        active_customer_status
    } = params;

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const customerIdentifierQuery = "INSERT INTO customer_identifier(customer_email, customer_phone_number) VALUES (?, ?)";
        const [result1] = await connection.query(customerIdentifierQuery, [customer_email, customer_phone_number]);
        const customerid = result1.insertId;

        const customerInfoQuery = "INSERT INTO customer_info(customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES (?, ?, ?, ?)";
        await connection.query(customerInfoQuery, [customerid, customer_first_name, customer_last_name, active_customer_status]);

        await connection.commit();

        return {
            customerid,
            customer_email,
            customer_phone_number,
            customer_first_name,
            customer_last_name,
            active_customer_status
        };
    } catch (error) {
        await connection.rollback();
        console.error("Error creating customer:", error);
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = {
    checkCustomerExists,
    createCustomer
};