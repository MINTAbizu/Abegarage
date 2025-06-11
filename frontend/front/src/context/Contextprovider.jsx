import { useState, useEffect, useContext, createContext } from "react";
import { getAuth } from "../util/Auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isloggedIn, setIsLoggedIn] = useState(false);
    const [isadmin, setIsAdmin] = useState(false);
    const [employee, setEmployee] = useState({});



useEffect(() => {
    const response = getAuth();
    if (response && response.employee_token) {
        setIsLoggedIn(true);
        setEmployee(response);
        setIsAdmin(response.company_role_id === 3); // Use company_role_id
    } else {
        setIsLoggedIn(false);
        setEmployee({});
        setIsAdmin(false);
    }
}, []);
    const logout = () => {
        localStorage.removeItem('employee');
        setIsLoggedIn(false);
        setEmployee({});
        setIsAdmin(false);
    };










       return (
        <AuthContext.Provider value={{
            isloggedIn,
            setIsLoggedIn,
            isadmin,
            setIsAdmin,
            employee,
            setEmployee,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );

}