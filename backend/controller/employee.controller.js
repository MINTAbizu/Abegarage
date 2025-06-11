const { data } = require('react-router-dom')
const employeeservices=require('../services/employee.services')

async function employyecontroller(req,res){
    const employee=req.body.employee_email

    const employye_exist= await employeeservices.checkemployeeexist(employee)

    if(employye_exist){
        return res.status(400).json({
            message:'email already occured'
           
        })

    }

    try {
        const employeedata=req.body
        const create= await employeeservices.createEmployee(employeedata)

        return res.status(201).json({
            message:"user registeared"
        })

    } catch (error) {

        return res.status(500).json({
            error:'user is not regidseread' + error
        })
        
    }

}

//get all employee
 async function getallemployee(req, res, next) {
    try {
        const conn = req.app.get('db'); // or however you get your db connection
const employees = await employeeservices.getallemployee();    
    if (!employees || employees.length === 0) {
            return res.status(404).json({ error: "No employees found" });
        }
        res.status(200).json(employees); // Send array directly
    } catch (error) {
        console.error("getallemployee error:", error);
        res.status(500).json({ error: "Internal server error: " + error });
    }
}

// getallemployee
module.exports={
    employyecontroller,
    getallemployee
    
  
}