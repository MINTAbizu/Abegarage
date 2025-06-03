const conn=require('../DB.config.js/Db')

async function checkemployeeexist(email){
    const query='SELECT * FROM employee WHERE employee_emial= ?'

    const [rows]=await conn.query(query,[email])

    return rows.length > 0;
}

async function createemployee(parms){
    const {employee_email, employee_password, active_employee, employee_first_name,
         employee_last_name, employee_phone, company_role_id}= parms;
try {
    
const hashedPassword=await bcrypt.hash(employee_password, 10);

const queryemployee='INSERT INTO employee (employee_email, active_employee) VALUES (?, ?)';
const [result]=await conn.query(queryemployee,[employee_email,active_employee])

const employeeid=result.insertId

const queryemployeeinfo='INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone, company_role_id) VALUES (?, ?, ?, ?, ?)';
    await conn.query(queryemployeeinfo, [employeeid, employee_first_name, employee_last_name, employee_phone]);


     const querypassword='INSERT INTO employee_password (employee_id, employee_password) VALUES (?, ?)';
    await conn.query(querypassword, [employeeid, hashedPassword]);

    const querycompanyrole='INSERT INTO employee_company_role (employee_id, company_role_id) VALUES (?, ?)';
    await conn.query(querycompanyrole, [employeeid, company_role_id]);

    return{employeeid}

} catch (error) {
    console.error('Error creating employee:', error);
    throw new Error('Failed to create employee');
  }
    
}

          

module.exports={
    checkemployeeexist,
    createemployee
}
