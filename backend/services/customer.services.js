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

// Get all customers
async function customerlist() {
    const query = `
        SELECT 
            ci.customer_id,
            ci.customer_email,
            ci.customer_phone_number,
            info.customer_first_name,
            info.customer_last_name,
            info.active_customer_status
        FROM customer_identifier ci
        INNER JOIN customer_info info ON ci.customer_id = info.customer_id
        ORDER BY ci.customer_id DESC
    `;
    const [rows] = await pool.query(query);
    return rows;
}

// Get customer by ID
async function getCustomerById(customer_id) {
    const query = `
        SELECT 
            ci.customer_id,
            ci.customer_email,
            ci.customer_phone_number,
            info.customer_first_name,
            info.customer_last_name,
            info.active_customer_status
        FROM customer_identifier ci
        INNER JOIN customer_info info ON ci.customer_id = info.customer_id
        WHERE ci.customer_id = ?
    `;
    const [rows] = await pool.query(query, [customer_id]);
    return rows[0];
}

// Check if customer exists by ID
async function checkCustomerById(customer_id) {
    const query = 'SELECT * FROM customer_identifier WHERE customer_id = ?';
    const [rows] = await pool.query(query, [customer_id]);
    return rows.length > 0;
}

// Delete customer
async function deleteCustomer(customer_id) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Delete from customer_info first (due to foreign key constraint)
        await connection.query('DELETE FROM customer_info WHERE customer_id = ?', [customer_id]);
        
        // Then delete from customer_identifier
        await connection.query('DELETE FROM customer_identifier WHERE customer_id = ?', [customer_id]);

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

// Get customer vehicles
async function getCustomerVehicles(customer_id) {
    const query = `
        SELECT 
            v.vehicle_id,
            v.vehicle_make,
            v.vehicle_model,
            v.vehicle_year,
            v.vehicle_tag as license_plate,
            v.vehicle_type,
            v.vehicle_mileage,
            v.vehicle_serial,
            v.vehicle_color
        FROM customer_vehicle_info v
        WHERE v.customer_id = ?
        ORDER BY v.vehicle_id DESC
    `;
    const [rows] = await pool.query(query, [customer_id]);
    return rows;
}

module.exports = {
    checkCustomerExists,
    createCustomer,
    customerlist,
    getCustomerById,
    checkCustomerById,
    deleteCustomer,
    getCustomerVehicles
};