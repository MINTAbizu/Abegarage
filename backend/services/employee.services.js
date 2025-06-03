const conn=require('../DB.config.js/Db')
const bcrypt = require('bcrypt');
async function checkemployeeexist(email){
   const query='SELECT * FROM employee WHERE employee_email= ?'

   const rows = await conn.query(query, [email]);
return rows.length > 0;
}



async function createemployee(parms) {
    const { employee_email, employee_password, active_employee, employee_first_name,
        employee_last_name, employee_phone, company_role_id,company_role_name	} = parms;
    const pool = conn.pool; // Get the pool from your DB config

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const hashedPassword = await bcrypt.hash(employee_password, 10);

        const queryemployee = 'INSERT INTO employee (employee_email, active_employee) VALUES (?, ?)';
        const [result] = await connection.query(queryemployee, [employee_email, active_employee]);
        const employeeid = result.insertId;

        const queryemployeeinfo = 'INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES ( ?, ?, ?, ?)';
        await connection.query(queryemployeeinfo, [employeeid, employee_first_name, employee_last_name, employee_phone]);

        const querypassword = 'INSERT INTO employee_pass (employee_id, employee_password_hashed	) VALUES (?, ?)';
        await connection.query(querypassword, [employeeid, hashedPassword]);

        const querycompanyrole = 'INSERT INTO company_roles (company_role_id ,company_role_name	) VALUES (?, ?)';
        await connection.query(querycompanyrole, [employeeid, company_role_name	]);

        await connection.commit();	

        return { employeeid };
    } catch (error) {
        await connection.rollback();
        console.error('Error creating employee:', error);
        throw new Error('Failed to create employee');
    } finally {
        connection.release();
    }
}

          

module.exports={
    checkemployeeexist,
    createemployee
}
