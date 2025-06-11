import React from 'react'
import { Link } from 'react-router-dom'
// import '../Loginform/loginstyle.css'
// import '../../component/Loginform/loginstyle.css'

function Adminmenu() {
  return (
    <div className='adminleftcontent'  >
          <h2 className='textalign-center' style={{textAlign:'center'}}>Admin</h2>
           <hr  style={{backgroundColor:'white'}}/>
              <ul style={{padding:'1px', height:'100%'}}>
                <li><a href="#">Dashboard</a></li>
                <hr  style={{backgroundColor:'white'}}/>
                <li><Link to={'/Admin/addemployee'}>Add Employe</Link></li>
                <hr  style={{backgroundColor:'white'}}/>
                <li><Link to={'/Admin/Employess'}> Employe-list</Link></li>
                 <hr  style={{backgroundColor:'white'}}/>
             
                 <hr  style={{backgroundColor:'white'}}/>
                <li><a href="#">Services</a></li>
                 <hr  style={{backgroundColor:'white'}}/>
              
                 <hr  style={{backgroundColor:'white'}}/>
                  <li><Link to={'/Admin/orders'}>Orders</Link></li>
                   <hr  style={{backgroundColor:'white'}}/>
                    <li><a href="#">New orders</a></li>
                     <hr  style={{backgroundColor:'white'}}/>
                <li><Link to={'/Customer'}>Add customer</Link></li>
                       <hr  style={{backgroundColor:'white'}}/>
                        <li><Link to={'/Customerlist'}>Customerlist</Link></li>
                         <hr  style={{backgroundColor:'white'}}/>

              </ul>
      
    </div>
  )
}

export default Adminmenu
