import Header from "./component/component/Header/Header"
import './assets/assets/template_assets/css/bootstrap.css'
import './assets/assets/templatecss/css/style.css'
import './assets/assets/templatecss/css/responsive.css'
import './assets/assets/templatecss/css/color.css'
import { Routes, Router, Route } from "react-router-dom";
import Footer from "./component/component/footer/Footer"
// import Servecs from './components/pages/Servecs'
import Home from "./component/pages/Home"
import AddEmploye from "./component/pages/Admin/AddEmploye"
import Loginform from "./component/component/Login/Loginform"
import Unauthorized from "./component/Unauthorized"
import Protected from "./component/Autorization/Protectedroute"
import Orders from "./component/pages/Orders"
import Customer from "./component/pages/Customer"
import Employess from "./component/pages/Employess"
import Vechicle from "./component/pages/Admin/Vechicle"
import CustomerList from "./component/pages/Admin/customer/CustomerList"
// import CustomerSearchResults from "./components/pages/Admin/customer/CustomerSearchResults"
import CustomerDetail from "./component/pages/Admin/customer/CustomerDetail"
import Project from "./component/pages/Project"

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        {/* <Route path="/Servecs" element={<Servecs/>}/> */}
        <Route path="/Project" element={<Project/>}/>
        
        <Route path="/Admin/addemployee" element={
          <Protected role={[3]}>   
            <AddEmploye/>
          </Protected>
        }/>

        <Route path="/login" element={<Loginform/>}/>
        <Route path="/unauthorized" element={<Unauthorized/>}/>

        <Route path="/Admin/orders" element={
          <Protected role={[1,2,3]}> 
            <Orders/>
          </Protected>
        }/>

        <Route path="/Admin/Employess" element={<Employess/>}/>
        <Route path="/Customer" element={<Customer/>}/>
        <Route path="/CustomerList" element={<CustomerList/>}/>
        <Route path="/customer/:id" element={<CustomerDetail/>}/>

        <Route path="/vehicle-registration/:customerId" element={
          <Protected role={[1,2,3]}>
            <Vechicle/>
          </Protected>
        }/>
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
