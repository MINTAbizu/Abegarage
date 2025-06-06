// const employeeservices = require('../services/employee.services');
const bcrypt = require('bcrypt');
const employeeservices = require('../services/employee.services');

// async function login(userdata) {
//     // try {
//     //     const employeerow = await employeeservices.getEmployeeByEmail(userdata.employee_email);

//     //     if (!employeerow || employeerow.length === 0) {
//     //         return { status: 400, message: "user not found" };
//     //     }
//     //     const employee = employeerow[0];

//     //     const checkpassword = await bcrypt.compare(userdata.employee_password, employee.employee_password_hashed);
//     //     if (!checkpassword) {
//     //         return { status: 401, message: 'invalid password' };
//     //     }

//     //     return {
//     //         data: employee,
//     //         status: 200,
//     //         message: "user login successfully"
//     //     };
//     // } catch (error) {
//     //     console.error("Error during login:", error);
//     //     return { status: 500, message: "Internal server error" };
//     // }

//     // /////////////////////////////////
//     try {
//         // let returnData = {}; // Object to be returned
//         const employee = await employeeservices.getEmployeeByEmail(userdata.employee_email);
//         if (employee.length === 0) {
//           return {
//             status: 400,
//             message: "Employee does not exist"
//           };
          
//         }
//         const passwordMatch = await bcrypt.compare(userdata.employee_password, employee[0].employee_password);
//         if (!passwordMatch) {
//           return {
//             status: 401,
//             message: "Incorrect password"
//           };
//         //   return returnData;
//         }
//         return {
//             data: employee,
//             status: 200,
//             message: "user login successfully"
//         };
//         // return returnData;
//       } catch (error) {
//         console.log(error);
//       }
// }

// module.exports = { login };



async function login(userdata) {
  try {
    const employeeRows = await employeeservices.getEmployeeByEmail(userdata.employee_email);
    if (!employeeRows || employeeRows.length === 0) {
      return { status: 404, message: "Employee not found" };
    }
    const employee = employeeRows[0];
    console.log(employee)
    const isPasswordValid = await bcrypt.compare(userdata.employee_password, employee.employee_password_hashed);
    if (!isPasswordValid) {
      return { status: 401, message: "Invalid password" };
    }
    return { status: 200, data: employee };
  } catch (error) {
    console.error("Error during login:", error);
    return { status: 500, message: "Internal server error" };
  }
}
module.exports ={login}