import Header from "./component/component/Header/Header"
import './assets/assets/templatecss/css/bootstrap.css'
import './assets/assets/templatecss/css/style.css'
import './assets/assets/templatecss/css/responsive.css'
import './assets/assets/templatecss/css/color.css'
import { Routes,Router, Route } from "react-router-dom";
import Footer from "./component/component/footer/Footer"
import Servecs from './component/pages/Servecs'
import Home from "./component/pages/Home"
import AddEmploye from "./component/pages/Admin/AddEmploye"
import Loginform from "./component/component/Login/Loginform"
import Unautorized from "./component/unautorized"
import Protected from "./component/Autorization/Protectedroute"
import Orders from "./component/pages/Orders"
import Customer from "./component/pages/Customer"
import Employess from "./component/pages/Employess"
// import Customerlist from "./component/pages/Admin/customer/Custmerlist"
import Vechicle from "./component/pages/Admin/Vechicle"
import CustomerList from "./component/pages/Admin/customer/CustomerList"
import CustomerSearchResults from "./component/pages/Admin/customer/CustomerSearchResults"
import CustomerDetail from "./component/pages/Admin/customer/CustomerDetail"
import Project from "./component/pages/Project"
// import Servecs from "./component/pages/Servecs"
// import CreateOrder from "../../src/components/CreateOrder"
// import VehicleRegistration from "./"
// import VehicleRegistration from './component/pages/Admin/VehicleRegistration'

function App() {
  

  return (
    <>
     <Header/>
    <Routes>
      
       <Route path="/" element={<Home/>}/>
    
         <Route path="/Servecs" element={<Servecs/>}/>
           <Route path="/Project" element={<Project/>}/>
             <Route path="/" element={<Home/>}/>
               <Route path="/" element={<Home/>}/>

       <Route path="/Admin/addemployee" element={
           <Protected role={[3]} >   
            <AddEmploye/>
           </Protected>
        
        }/>

        <Route path="/login" element={<Loginform/>}/>
              <Route path="/unautorized" element={<Unautorized/>}/>

              <Route path="/Admin/orders" element={
                 <Protected role={[1,2,3]} > 
            <Orders/>
           </Protected>
                
                }/>

                
              <Route path="/Admin/Employess" element={ <Employess/>
                }/>
              <Route path="/Customer" element={<Customer/>}/>
              <Route path="/CustomerList" element={<CustomerList/>}/>
              <Route path="/customer/:id" element={<CustomerDetail/>}/>
           {/* <Route path="/customer-search" element={<CreateOrder />} />  */}

              <Route path="/vehicle-registration/:customerId" element={
                 <Protected role={[1,2,3]}>
                  <Vechicle/>
                 </Protected>
              }/>
                <Route path="/orders" element={<Orders />} />
        {/* <Protected /> */}
       

    </Routes>
    <Footer/>

   
    </>
   
  )
}

export default App
