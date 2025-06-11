import React from 'react'
import { useAuth } from '../../context/Contextprovider'
import Adminmenu from './Admin/Adminmenu';
import Employeelist from '../pages/Admin/Employeelist';

function Employess() {
   const { isloggedIn, isadmin } = useAuth();

   if(isloggedIn){
    if(isadmin){
     return(<div className="">
      <div className="container-fluid">
        <div className='row'>
          <div className='adminleft col-md-3'>
            <div className='adminleftcontent'>
            <Adminmenu/>
            </div>
             </div>
            <div className='adminrightside col-md-9'>
                {/* <Addemployeeform/>  */}
                <h2>
                 < Employeelist/>
                </h2>
            </div>


         
        </div>
      </div>

   </div>)
    }else{
      return(<h1 style={{color:'red'}}> you are not autorized  </h1>)
    }
   }else{
     return (
       <div>
         employeee
       </div>
     )
   }
}

export default Employess