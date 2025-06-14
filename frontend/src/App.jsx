import Header from "./components/Header/Header"
import './assets/templatecss/css/bootstrap.css'
import './assets/templatecss/css/style.css'
import './assets/templatecss/css/responsive.css'
import './assets/templatecss/css/color.css'
import { Routes, Router, Route } from "react-router-dom";
import Footer from "./components/footer/Footer"
import Servecs from './components/pages/Servecs'
import Home from "./components/pages/Home"
import AddEmploye from "./components/pages/Admin/AddEmploye"
import Loginform from "./components/Login/Loginform"
import Unauthorized from "./components/Unauthorized"
import Protected from "./components/Autorization/Protectedroute"
import Orders from "./components/pages/Orders"
import Customer from "./components/pages/Customer"
import Employess from "./components/pages/Employess"
import Vechicle from "./components/pages/Admin/Vechicle"
import CustomerList from "./components/pages/Admin/customer/CustomerList"
import CustomerSearchResults from "./components/pages/Admin/customer/CustomerSearchResults"
import CustomerDetail from "./components/pages/Admin/customer/CustomerDetail"
import Project from "./components/pages/Project"

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Servecs" element={<Servecs/>}/>
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
