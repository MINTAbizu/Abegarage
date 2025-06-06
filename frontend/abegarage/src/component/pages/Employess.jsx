import React from 'react'
import {useAuth} from '../../util/Auth'
function Employess() {
   const [isloggedIn, isadmin] = useAuth()

   if(isloggedIn){
    if(isadmin){
     return(<h1> employee page </h1>)
    }else{
      return(<h1> you are t autorized  </h1>)
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
