import React, { useState } from 'react'
import Adminmenu from './Adminmenu'
import Addemployeeform from '../../component/Addemployeeform/Addemployeeform'
// import Addemployefrom from '../../component/Addemployeform/Addemployefrom'
// import Adminmenu from './Adminmenu'

function AddEmploye() {
  


 
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
                <Addemployeeform/> 
            </div>

         
        </div>
      </div>

   </div>
    </div>
  )
}

export default AddEmploye
