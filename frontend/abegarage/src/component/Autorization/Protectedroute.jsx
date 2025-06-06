import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from '../../util/Auth';

const Protected = ({ role, children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [ischecked, setischecked] = useState(false);
    const [isloggedIn, setIsLoggedIn] = useState(false);

   useEffect(() => {
    const response = getAuth();
    if (response && response.employee_token) {
        setIsLoggedIn(true);
        // Convert company_role_id to number for comparison
        if (role && role.length > 0 && role.includes(Number(response.company_role_id))) {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    } else {
        setIsLoggedIn(false);
        setIsAuthorized(false);
    }
    setischecked(true);
}, [role]);

    if (ischecked) {
        if (!isloggedIn) {
            return <Navigate to='/login' />;
        }
        if (!isAuthorized) {
            return <Navigate to='/unautorized' />;
        }
    }

    return children;
}

export default Protected;