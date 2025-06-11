import React from 'react'
import Adminmenu from './Adminmenu'
import VehicleRegistration from './VehicleRegistration'

function Vechicle() {
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
                <VehicleRegistration/> 
            </div>

         
        </div>
      </div>

   </div>
      
    </div>
  )
}

export default Vechicle
