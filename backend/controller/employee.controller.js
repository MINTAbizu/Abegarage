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
        const create= await employeeservices.createemployee(employeedata)

        return res.status(201).json({
            message:"user registeared"
        })

    } catch (error) {

        return res.status(500).json({
            error:'user is not regidseread' + error
        })
        
    }

}
module.exports={
    employyecontroller
}