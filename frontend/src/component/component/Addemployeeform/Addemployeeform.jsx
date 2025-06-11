import React, { useState } from 'react'
import './addemployee.css'

function Addemployeeform() {
    const [firstName, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [companyrole, setcompanyrole] = useState('1')
    const [active, setactive] = useState('1')
    const [phone, setphone] = useState('')

    // error states
    const [firsnamerequired, setfirstnamerequired] = useState('')
    const [lastnamerequired, setlastnamerequired] = useState('')
    const [passwordrequired, setpasswordrequired] = useState('')
    const [emailerror, setemailerror] = useState('')

    // server error and success states
    const [servererror, setservererror] = useState('')
    const [success, setsuccess] = useState('')

    const handlesubmit = async (e) => {
        e.preventDefault()
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        let valid = true

        // First name validation
        if (!firstName) {
            setfirstnamerequired('first name required')
            valid = false
        } else {
            setfirstnamerequired('')
        }
        // Last name validation
        if (!lastname) {
            setlastnamerequired('last name required')
            valid = false
        } else {
            setlastnamerequired('')
        }
        // Email validation
        if (!email) {
            setemailerror('Email required')
            valid = false
        } else if (!emailPattern.test(email)) {
            setemailerror('Invalid email format')
            valid = false
        } else {
            setemailerror('')
        }
        // Password validation
        if (!password) {
            setpasswordrequired('password required')
            valid = false
        } else if (password.length < 6) {
            setpasswordrequired('Password must be at least 6 characters')
            valid = false
        } else if (!/(?=.*[a-z])/.test(password)) {
            setpasswordrequired('Password must include a lowercase letter')
            valid = false
        } else if (!/(?=.*[A-Z])/.test(password)) {
            setpasswordrequired('Password must include an uppercase letter')
            valid = false
        } else if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
            setpasswordrequired('Password must include a special character')
            valid = false
        } else {
            setpasswordrequired('')
        }

        // If not valid, do not proceed
        if (!valid) return

        // Reset server messages
        setservererror('')
        setsuccess('')

        // Example: Simulate server request
        try {
            // Replace with your actual API call
            const response = await fetch('http://localhost:5000/Admin/addemployee',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        employee_first_name: firstName,
                        employee_last_name: lastname,
                        employee_email: email,
                        employee_password: password,
                       company_role_id: Number(companyrole),
                        active_employee: active,
                        employee_phone: phone,
                        
                    }),
                })
            if (!response.ok) throw new Error('Server error')
            setsuccess('Employee added successfully!')
            setservererror('')

            // Simulate success
            setTimeout(() => {
                setsuccess('Employee added successfully!')
                setservererror('')
            }, 500)
            window.location.href = '/'
        } catch (err) {
            setservererror('Failed to add employee. Please try again.')
            setsuccess('')
        }
    }

    return (
        <div>
            <form className="add-employee-form" onSubmit={handlesubmit}>
                <h2>Add Employee</h2>
                {servererror && <div style={{ color: 'red' }}>{servererror}</div>}
                {success && <div style={{ color: 'green' }}>{success}</div>}
                <label>
                    First Name
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                        onChange={e => setfirstname(e.target.value)}
                        value={firstName}
                    />
                    {firsnamerequired && <h2 style={{ color: 'red' }}>{firsnamerequired}</h2>}
                </label>
                <label>
                    Last Name
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                        required
                        onChange={e => setlastname(e.target.value)}
                        value={lastname}
                    />
                    {lastnamerequired && <h2 style={{ color: 'red' }}>{lastnamerequired}</h2>}
                </label>
                <label>
                    Email
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        required
                        onChange={e => setemail(e.target.value)}
                        value={email}
                    />
                    {emailerror && <h2 style={{ color: 'red' }}>{emailerror}</h2>}
                </label>
                <label>
                    phone
                    <input
                        type="text"
                        name="phone"
                        placeholder="Enter phone"
                        required
                        onChange={e => setphone(e.target.value)}
                        value={phone}
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        required
                        onChange={e => setpassword(e.target.value)}
                        value={password}
                    />
                    {passwordrequired && <h2 style={{ color: 'red' }}>{passwordrequired}</h2>}
                </label>
                <label>
                    Role
                    <select
                        name="role"
                        required
                        onChange={e => setcompanyrole(e.target.value)}
                        value={companyrole}
                    >
                        <option value="">Select role</option>
                     <option value={3}>Admin</option>
                    <option value={1}>Manager</option>
                    <option value={2}>Employee</option>
                    </select>
                </label>
                <button type="submit">
                    Add Employee
                </button>
                {servererror && <h2> {servererror}</h2>}
                {success && <h2> {success}</h2>}
            </form>
        </div>
    )
}

export default Addemployeeform