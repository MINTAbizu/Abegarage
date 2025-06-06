import React from 'react'
// import '../Loginform/loginstyle.css'
// import '../../component/Loginform/loginstyle.css'

function Adminmenu() {
  return (
    <div className='adminleftcontent'  >
          <h2 className='textalign-center' style={{textAlign:'center'}}>Admin</h2>
           <hr  style={{backgroundColor:'white'}}/>
              <ul style={{padding:'5px', height:'100%'}}>
                <li><a href="#">Dashboard</a></li>
                <hr  style={{backgroundColor:'white'}}/>
                <li><a href="#">Add Employe</a></li>
                <hr  style={{backgroundColor:'white'}}/>
                <li><a href="#">Employe</a></li>
                 <hr  style={{backgroundColor:'white'}}/>
                <li><a href="#">Clients</a></li>
                 <hr  style={{backgroundColor:'white'}}/>
                <li><a href="#">Services</a></li>
                 <hr  style={{backgroundColor:'white'}}/>
                <li><a href="#">Manage Products</a></li>
                 <hr  style={{backgroundColor:'white'}}/>
                  <li><a href="#">Orders</a></li>
                   <hr  style={{backgroundColor:'white'}}/>
                    <li><a href="#">New orders</a></li>
                     <hr  style={{backgroundColor:'white'}}/>
                      <li><a href="#">Add-customer</a></li>
                       <hr  style={{backgroundColor:'white'}}/>
                        <li><a href="#">Customers</a></li>
                         <hr  style={{backgroundColor:'white'}}/>

              </ul>
      
    </div>
  )
}

export default Adminmenu
