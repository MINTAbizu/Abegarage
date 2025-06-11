const { pool } = require('../DB.config.js/Db');

// Get all services
async function getAllServices() {
    const query = 'SELECT * FROM common_services ORDER BY service_name';
    const [rows] = await pool.query(query);
    return rows;
}

// Get services by customer ID
async function getCustomerServices(customerId) {
    const query = `
        SELECT s.* 
        FROM common_services s
        INNER JOIN order_services os ON s.service_id = os.service_id
        INNER JOIN orders o ON os.order_id = o.order_id
        WHERE o.customer_id = ?
        GROUP BY s.service_id
    `;
    const [rows] = await pool.query(query, [customerId]);
    return rows;
}

// Get service by ID
async function getServiceById(service_id) {
    const query = 'SELECT * FROM common_services WHERE service_id = ? ';
    const [rows] = await pool.query(query, [service_id]);
    return rows[0];
}

// Create new service
async function createService(params) {
    const {
        service_name,
        service_description,
        // service_price,
        // active_service = 1
    } = params;

    const query = `
        INSERT INTO common_services(
            service_name,
            service_description
           
        ) VALUES (?, ?)
    `;

    const [result] = await pool.query(query, [
     
       query
    ]);

    return {
        service_id: result.insertId,
        ...params
    };
}

// Update service
async function updateService(service_id, params) {
    const {
        service_name,
        service_description,
        service_price,
        active_service
    } = params;

    const query = `
        UPDATE common_services
        SET 
            service_name = ?,
            service_description = ?,
            service_price = ?,
            active_service = ?
        WHERE service_id = ?
    `;

    const [result] = await pool.query(query, [
        service_name,
        service_description,
        service_price,
        active_service,
        service_id
    ]);

    return result.affectedRows > 0;
}

// // Delete service (soft delete)
// async function deleteService(service_id) {
//     const query = 'UPDATE common_services SET active_service = 0 WHERE service_id = ?';
//     const [result] = await pool.query(query, [service_id]);
//     return result.affectedRows > 0;
// }

// Create service order for customer
async function createServiceOrder(customerId, services) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Get any employee to assign to the order
        const employeeQuery = 'SELECT employee_id FROM employee LIMIT 1';
        const [employees] = await connection.query(employeeQuery);
        
        if (!employees || employees.length === 0) {
            throw new Error('No employees found to assign to the order');
        }

        const employeeId = employees[0].employee_id;

        // Get a vehicle for this customer
        const vehicleQuery = 'SELECT vehicle_id FROM customer_vehicle_info WHERE customer_id = ? LIMIT 1';
        const [vehicles] = await connection.query(vehicleQuery, [customerId]);
        
        if (!vehicles || vehicles.length === 0) {
            throw new Error('No vehicles found for this customer. Please add a vehicle first.');
        }

        const vehicleId = vehicles[0].vehicle_id;

        // Create the order with employee_id and vehicle_id
        const orderQuery = 'INSERT INTO orders (customer_id, employee_id, vehicle_id, order_date) VALUES (?, ?, ?, NOW())';
        const [orderResult] = await connection.query(orderQuery, [customerId, employeeId, vehicleId]);
        const orderId = orderResult.insertId;

        // Add services to the order
        const serviceValues = services.map(service => [orderId, service.service_id]);
        const serviceQuery = 'INSERT INTO order_services (order_id, service_id) VALUES ?';
        await connection.query(serviceQuery, [serviceValues]);

        await connection.commit();

        // Fetch the created order with its services
        const orderDetailsQuery = `
            SELECT o.*, s.service_name, s.service_description
            FROM orders o
            INNER JOIN order_services os ON o.order_id = os.order_id
            INNER JOIN common_services s ON os.service_id = s.service_id
            WHERE o.order_id = ?
        `;
        const [orderDetails] = await connection.query(orderDetailsQuery, [orderId]);

        return {
            order_id: orderId,
            customer_id: customerId,
            employee_id: employeeId,
            vehicle_id: vehicleId,
            services: orderDetails
        };
    } catch (error) {
        await connection.rollback();
        console.error('Error in createServiceOrder:', error);
        throw error;
    } finally {
        connection.release();
    }
}

// Get all orders with customer and vehicle details
const getAllOrders = async () => {
    try {
        const query = `
            SELECT 
                o.order_id,
                o.order_date,
                ost.order_status,
                ci.customer_id,
                ci.customer_first_name as first_name,
                ci.customer_last_name as last_name,
                cid.customer_phone_number as phone_number,
                cid.customer_email as email,
                v.vehicle_id,
                v.vehicle_tag as vehicle_number,
                v.vehicle_model,
                v.vehicle_make as vehicle_brand,
                GROUP_CONCAT(s.service_name) as services
            FROM orders o
            INNER JOIN customer_identifier cid ON o.customer_id = cid.customer_id
            INNER JOIN customer_info ci ON cid.customer_id = ci.customer_id
            INNER JOIN customer_vehicle_info v ON o.vehicle_id = v.vehicle_id
            INNER JOIN order_status ost ON o.order_id = ost.order_id
            INNER JOIN order_services os ON o.order_id = os.order_id
            INNER JOIN common_services s ON os.service_id = s.service_id
            GROUP BY o.order_id
            ORDER BY o.order_date DESC
        `;
        const [orders] = await pool.query(query);
        return orders;
    } catch (error) {
        console.error('Error in getAllOrders:', error);
        throw error;
    }
};

module.exports = {
    getAllServices,
    getCustomerServices,
    getServiceById,
    createService,
    updateService,
    createServiceOrder,
    getAllOrders
}; 