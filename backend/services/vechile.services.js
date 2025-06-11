const { pool } = require('../DB.config.js/Db');
const customerService = require('./customer.services');

// Check if vehicle exists by tag
async function checkVehicleExist(vehicle_tag) {
    const [rows] = await pool.query(
        'SELECT * FROM customer_vehicle_info WHERE vehicle_tag = ?', 
        [vehicle_tag]
    );
    return rows.length > 0;
}

// Check if vehicle exists by ID
async function checkvichelbyid(vehicle_id) {
    if (!vehicle_id) {
        throw new Error('Vehicle ID is required');
    }
    
    const query = 'SELECT * FROM customer_vehicle_info WHERE vehicle_id = ?';
    const [rows] = await pool.query(query, [vehicle_id]);
    return rows.length > 0;
}

// Get all vehicles
async function getAllVehicles() {
    const query = `
        SELECT 
            v.*,
            c.customer_first_name,
            c.customer_last_name
        FROM customer_vehicle_info v
        INNER JOIN customer_info c ON v.customer_id = c.customer_id
        ORDER BY v.vehicle_id DESC
    `;
    const [rows] = await pool.query(query);
    return rows;
}

// Get vehicle by ID
async function getVehicleById(vehicle_id) {
    if (!vehicle_id) {
        throw new Error('Vehicle ID is required');
    }

    const query = `
        SELECT 
            v.*,
            c.customer_first_name,
            c.customer_last_name
        FROM customer_vehicle_info v
        INNER JOIN customer_info c ON v.customer_id = c.customer_id
        WHERE v.vehicle_id = ?
    `;
    const [rows] = await pool.query(query, [vehicle_id]);
    return rows[0];
}

// Get vehicles by customer ID
async function getVehiclesByCustomerId(customer_id) {
    if (!customer_id) {
        throw new Error('Customer ID is required');
    }

    const query = `
        SELECT 
            v.*,
            c.customer_first_name,
            c.customer_last_name
        FROM customer_vehicle_info v
        INNER JOIN customer_info c ON v.customer_id = c.customer_id
        WHERE v.customer_id = ?
    `;
    const [rows] = await pool.query(query, [customer_id]);
    return rows;
}

// Create new vehicle
async function createVehicle(params) {
    const {
        customer_id,
        vehicle_make,
        vehicle_model,
        vehicle_year,
        vehicle_type,
        vehicle_mileage,
        vehicle_tag,
        vehicle_serial,
        vehicle_color
    } = params;

    if (!customer_id || !vehicle_tag) {
        throw new Error('Customer ID and vehicle tag are required');
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const query = `
            INSERT INTO customer_vehicle_info(
                customer_id,
                vehicle_make,
                vehicle_model,
                vehicle_year,
                vehicle_type,
                vehicle_mileage,
                vehicle_tag,
                vehicle_serial,
                vehicle_color
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await connection.query(query, [
            customer_id,
            vehicle_make,
            vehicle_model,
            vehicle_year,
            vehicle_type,
            vehicle_mileage,
            vehicle_tag,
            vehicle_serial,
            vehicle_color
        ]);

        await connection.commit();

        return {
            vehicle_id: result.insertId,
            ...params
        };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

// Update vehicle
async function updateVehicle(vehicle_id, params) {
    if (!vehicle_id) {
        throw new Error('Vehicle ID is required');
    }

    const {
        vehicle_plate_number,
        vehicle_make,
        vehicle_model,
        vehicle_year,
        vehicle_color,
        vehicle_vin,
        active_vehicle_status
    } = params;

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const query = `
            UPDATE customer_vehicle_info
            SET 
                vehicle_plate_number = ?,
                vehicle_make = ?,
                vehicle_model = ?,
                vehicle_year = ?,
                vehicle_color = ?,
                vehicle_vin = ?,
                active_vehicle_status = ?
            WHERE vehicle_id = ?
        `;

        const [result] = await connection.query(query, [
            vehicle_plate_number,
            vehicle_make,
            vehicle_model,
            vehicle_year,
            vehicle_color,
            vehicle_vin,
            active_vehicle_status,
            vehicle_id
        ]);

        await connection.commit();

        return result.affectedRows > 0;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

// Delete vehicle (soft delete)
async function deleteVehicle(vehicle_id) {
    if (!vehicle_id) {
        throw new Error('Vehicle ID is required');
    }

    const query = 'UPDATE customer_vehicle_info SET active_vehicle_status = 0 WHERE vehicle_id = ?';
    const [result] = await pool.query(query, [vehicle_id]);
    return result.affectedRows > 0;
}

module.exports = {
    checkVehicleExist,
    checkvichelbyid,
    getAllVehicles,
    getVehicleById,
    getVehiclesByCustomerId,
    createVehicle,
    updateVehicle,
    deleteVehicle
};