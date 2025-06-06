const loginservices = require('../services/login.services');
const jwt = require('jsonwebtoken');
const secretkey = process.env.SECRETKEY;

async function login(req, res) {
    try {
        const userdata = req.body;
        const result = await loginservices.login(userdata);

        if (result.status !== 200) {
            return res.status(result.status).json({ error: result.message });
        }
                              
        const employee = result.data;
        const payload = {                                                                                                                
            employee_id: employee.employee_id,
            employee_email: employee.employee_email,
            employee_firstname: employee.employee_first_name,
            employee_last_name: employee.employee_last_name,
            company_role_id: employee.company_role_id // Add this line
        };

        const token = jwt.sign(payload, secretkey, { expiresIn: '24h' });
        return res.status(200).json({
            token,
            employee_id: employee.employee_id,
            employee_email: employee.employee_email,
            employee_firstname: employee.employee_first_name,
            employee_last_name: employee.employee_last_name,
            company_role_id: employee.company_role_id // Add this line
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { login };