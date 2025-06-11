const conn = require('../DB.config.js/Db');
const bcrypt = require('bcrypt');
const {pool}=require('../DB.config.js/Db')

async function checkemployeeexist(email) {
    const query = 'SELECT * FROM employee WHERE employee_email= ?';
    const rows = await conn.query(query, [email]);
    return rows.length > 0;
}


async function createEmployee(params) {
    const { employee_email, employee_password, active_employee, employee_first_name,
         employee_last_name, employee_phone, company_role_id } = params;

    const hashedPassword = await bcrypt.hash(employee_password, 10);

const connection = await pool.getConnection();
    // console.log(query)
    try {
        await connection.beginTransaction();
          const query = "INSERT INTO employee (employee_email, active_employee) VALUES (?, ?)";

        const result = await conn.query(query, [employee_email, active_employee]);
        const employee_id = result.insertId;

        const queryInfo = "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)";
        await conn.query(queryInfo, [employee_id, employee_first_name, employee_last_name, employee_phone]);

        const queryPassword = "INSERT INTO employee_pass(employee_id, employee_password_hashed) VALUES (?, ?)";
        await conn.query(queryPassword, [employee_id, hashedPassword]);

        const queryRole = "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)";
           await conn.query(queryRole, [employee_id, company_role_id]);
            await connection.commit();
        return { employee_id };

    } catch (error) {
         await connection.rollback();
        console.error("Error creating employee:", error);
        throw error;
    } finally {
    connection.release();
}
}




async function checkemployeebyid(employee_id) {
    const query = 'SELECT * FROM employee  WHERE employee_id = ?';
    const [rows] = await pool.query(query, [employee_id]);
    return rows.length > 0;
}














async function getEmployeeByEmail(employee_email) {
    const query = `
        SELECT employee.*, employee_info.*, employee_pass.employee_password_hashed, employee_role.company_role_id
        FROM employee
        INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id
        INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id
        INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id
        WHERE employee.employee_email = ?
    `;
    const rows = await conn.query(query, [employee_email]);
    return rows;
}

async function getallemployee() {
    const query = `
        SELECT 
            employee.employee_id,
            employee.employee_email,
            employee.active_employee,
            employee.added_date,
            employee_info.employee_info_id,
            employee_info.employee_first_name,
            employee_info.employee_last_name,
            employee_info.employee_phone,
            employee_role.company_role_id,
            company_roles.company_role_name
        FROM employee
        INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id
        INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id
        INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id
        ORDER BY employee.employee_id DESC
        LIMIT 10
    `;
    const [rows] = await pool.query(query);
    return rows;
}

module.exports = {
    checkemployeeexist,
   createEmployee,
    getEmployeeByEmail,
    getallemployee,
    checkemployeebyid
};