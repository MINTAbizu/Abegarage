const { pool } = require('../DB.config.js/Db');
const crypto = require('crypto');
const customerService = require('../services/customer.services');
const employeeService = require('../services/employee.services');
const vehicleService = require('../services/vechile.services');
const serviceeservices=require('../services/service.services')
// Create a new order
async function createOrder(params) {
    if (!params) {
        throw new Error('No parameters provided');
    }

    const {
        employee_id,
        customer_id,
        vehicle_id,
        service_id,
        order_total_price,
        estimated_completion_date,
        additional_request,
        notes_for_internal_use,
        notes_for_customer,
        services
    } = params;

    // Validate required fields
    if (!employee_id || !customer_id || !vehicle_id || !order_total_price) {
        throw new Error('Missing required fields: employee_id, customer_id, vehicle_id, and order_total_price are required');
    }

    // Check if customer exists
    const customerExists = await customerService.checkCustomerById(customer_id);
    if (!customerExists) {
        throw new Error(`Customer with ID ${customer_id} does not exist`);
    }

    // Check if employee exists
    const employeeExists = await employeeService.checkemployeebyid(employee_id);
    if (!employeeExists) {
        throw new Error(`Employee with ID ${employee_id} does not exist`);
    }


    const getService = await serviceeservices.getServiceById(service_id);
    if (!employeeExists) {
        throw new Error(`Employee with ID ${service_id} does not exist`);
    }

    

    // Check if vehicle exists
    const vehicleExists = await vehicleService.checkvichelbyid(vehicle_id);
    if (!vehicleExists) {
        throw new Error(`Vehicle with ID ${vehicle_id} does not exist`);
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Generate order hash
        const order_hash = crypto.randomBytes(16).toString('hex');

        // Insert into orders table
        const orderQuery = "INSERT INTO orders(employee_id, customer_id, vehicle_id, active_order, order_hash) VALUES (?, ?, ?, 1, ?)";
        const [orderResult] = await connection.query(orderQuery, [employee_id, customer_id, vehicle_id, order_hash]);
        const order_id = orderResult.insertId;

        // Insert into order_info table
        const orderInfoQuery = "INSERT INTO order_info(order_id, order_total_price, estimated_completion_date, additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed) VALUES (?, ?, ?, ?, ?, ?, 0)";
        await connection.query(orderInfoQuery, [order_id, order_total_price, estimated_completion_date, additional_request, notes_for_internal_use, notes_for_customer]);

        // Insert into order_services table
        if (services && services.length > 0) {
            const serviceValues = services.map(service => [order_id, service.service_id, 0]);
            const serviceQuery = "INSERT INTO order_services(order_id, service_id, service_completed) VALUES ?";
            await connection.query(serviceQuery, [serviceValues]);
        }

        // Insert initial order status
        const statusQuery = "INSERT INTO order_status(order_id, order_status) VALUES (?, 1)";
        await connection.query(statusQuery, [order_id]);

        await connection.commit();

        return {
            order_id,
            order_hash,
            message: "Order created successfully"
        };
    } catch (error) {
        await connection.rollback();
        console.error("Error creating order:", error);
        throw error;
    } finally {
        connection.release();
    }
}

// Get all orders
async function getAllOrders() {
    const query = `
        SELECT 
            o.order_id,
            o.order_hash,
            o.order_date,
            o.active_order,
            oi.order_total_price,
            oi.estimated_completion_date,
            oi.completion_date,
            oi.additional_request,
            os.order_status,
            ci.customer_email,
            ci.customer_phone_number,
            c.customer_first_name,
            c.customer_last_name,
            v.vehicle_tag as vehicle_plate,
            v.vehicle_model,
            v.vehicle_year,
            e.employee_first_name as received_by,
            GROUP_CONCAT(s.service_name) as services
        FROM orders o
        LEFT JOIN order_info oi ON o.order_id = oi.order_id
        LEFT JOIN order_status os ON o.order_id = os.order_id
        LEFT JOIN customer_info c ON o.customer_id = c.customer_id
        LEFT JOIN customer_identifier ci ON o.customer_id = ci.customer_id
        LEFT JOIN customer_vehicle_info v ON o.vehicle_id = v.vehicle_id
        LEFT JOIN employee_info e ON o.employee_id = e.employee_id
        LEFT JOIN order_services os2 ON o.order_id = os2.order_id
        LEFT JOIN common_services s ON os2.service_id = s.service_id
        GROUP BY o.order_id
        ORDER BY o.order_date DESC
    `;
    const [rows] = await pool.query(query);
    return rows;
}

// Get order by ID
async function getOrderById(order_id) {
    const query = `
        SELECT 
            o.*,
            oi.*,
            os.order_status,
            c.customer_first_name,
            c.customer_last_name,
            v.vehicle_plate_number,
            GROUP_CONCAT(s.service_name) as services
        FROM orders o
        INNER JOIN order_info oi ON o.order_id = oi.order_id
        INNER JOIN order_status os ON o.order_id = os.order_status_id
        INNER JOIN customer_info c ON o.customer_id = c.customer_id
        INNER JOIN customer_vehicle_info v ON o.vehicle_id = v.vehicle_id
        LEFT JOIN order_services os2 ON o.order_id = os2.order_id
        LEFT JOIN common_services s ON os2.service_id = s.service_id
        WHERE o.order_id = ?
        GROUP BY o.order_id
    `;
    const [rows] = await pool.query(query, [order_id]);
    return rows[0];
}

// Update order status
async function updateOrderStatus(order_id, status) {
    const query = "UPDATE order_status SET order_status = ? WHERE order_id = ?";
    const [result] = await pool.query(query, [status, order_id]);
    return result.affectedRows > 0;
}

// Update order completion
async function updateOrderCompletion(order_id, completion_date) {
    const query = "UPDATE order_info SET completion_date = ? WHERE order_id = ?";
    const [result] = await pool.query(query, [completion_date, order_id]);
    return result.affectedRows > 0;
}

// Update service completion status
async function updateServiceCompletion(order_id, service_id, completed) {
    const query = "UPDATE order_services SET service_completed = ? WHERE order_id = ? AND service_id = ?";
    const [result] = await pool.query(query, [completed, order_id, service_id]);
    return result.affectedRows > 0;
}

// Delete order (soft delete)
async function deleteOrder(order_id) {
    const query = "UPDATE orders SET active_order = 0 WHERE order_id = ?";
    const [result] = await pool.query(query, [order_id]);
    return result.affectedRows > 0;
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    updateOrderCompletion,
    updateServiceCompletion,
    deleteOrder
};
