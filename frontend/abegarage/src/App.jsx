import Header from "./component/component/Header/Header"
import './assets/assets/templatecss/css/bootstrap.css'
import './assets/assets/templatecss/css/style.css'
import './assets/assets/templatecss/css/responsive.css'
import './assets/assets/templatecss/css/color.css'
import { Routes,Router, Route } from "react-router-dom";
import Footer from "./component/component/footer/Footer"
import Home from "./component/pages/Home"
import AddEmploye from "./component/pages/Admin/AddEmploye"
import Loginform from "./component/component/Login/Loginform"
import Unautorized from "./component/unautorized"
import Protected from "./component/Autorization/Protectedroute"
import Orders from "./component/pages/Orders"
import Customer from "./component/pages/Customer"

function App() {
  

  return (
    <>
     <Header/>
    <Routes>
      
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
              <Route path="/Customer" element={<Customer/>}/> 


        {/* <Protected /> */}
       

    </Routes>
    <Footer/>

   
    </>
   
  )
}

export default App
