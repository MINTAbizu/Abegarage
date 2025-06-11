import React from 'react'
import Adminmenu from './Admin/Adminmenu'
import CustomerRegister from './Admin/customer/CustomerRegister'
function Customer() {
  return (
    <div>
       <div className="">
      <div className="container-fluid">
        <div className='row'>
          <div className='adminleft col-md-3'>
            <div className='adminleftcontent'>
            <Adminmenu/>
            </div>
             </div>
            <div className='adminrightside col-md-9'>
              
                <CustomerRegister/> 
            </div>

         
        </div>
      </div>

   </div>
    </div>
  )
}

export default Customer
