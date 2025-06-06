export const getAuth = () => {
    const employee = JSON.parse(localStorage.getItem('employee'));
    if (employee && employee.employee_token) {
        const decodedToken = decodeToken(employee.employee_token);
        // Always set employee_first_name from token if missing
        employee.employee_first_name = employee.employee_first_name || decodedToken.firstname || decodedToken.employee_first_name;
        employee.company_role_id = employee.company_role_id || decodedToken.company_role_id; // <-- Use company_role_id
        employee.employee_id = employee.employee_id || decodedToken.employee_id;
        return employee;
    }
    return {};
};

export const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);


}