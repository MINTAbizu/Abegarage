import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Loginform() {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [servererror, setservererror] = useState('');

  // Use environment variable for API URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    let flag = true;

    // Validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError('Email required');
      flag = false;
    } else if (!emailPattern.test(email)) {
      setEmailError('Invalid email format');
      flag = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password required');
      flag = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      flag = false;
    } else if (!/(?=.*[a-z])/.test(password)) {
      setPasswordError('Password must include a lowercase letter');
      flag = false;
    } else if (!/(?=.*[A-Z])/.test(password)) {
      setPasswordError('Password must include an uppercase letter');
      flag = false;
    } else if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
      setPasswordError('Password must include a special character');
      flag = false;
    } else {
      setPasswordError('');
    }

    if (!flag) return;

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employee_email: email,
          employee_password: password,
        })
      })
      const data = await response.json();
      console.log(data)

      if (response.ok) {
        const employeedata = {
          employee_token: data.token,
          employee_id: data.employee_id,
          employee_first_name: data.employee_firstname,
          company_role_id: data.company_role_id,
        }
        localStorage.setItem('employee', JSON.stringify(employeedata));
        setSuccess('Login successful');
        setError('');
        setTimeout(() => {
          navigate('/');
          window.location.href = '/'
        }, 2000);
      } else {
        setError(data.error || 'Login failed');
        setSuccess('');
      }

    } catch (error) {
      setservererror('Server error. Please try again.');
    }

  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4 mx-auto">
          <div className="card shadow-sm p-4">
            <h1 className="text-center mb-3">Login</h1>
            <p className="text-center mb-4">Login to your account</p>
            <form className="form" onSubmit={handleSubmit} style={{width:'100%'}}>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-group mb-3 w-100">
                {emailError && <div className="alert alert-danger py-1 px-2 mb-2">{emailError}</div>}
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control form-control-lg w-100"
                  id="email"
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                  required
                  placeholder="Enter email"
                  autoComplete="username"
                  style={{ boxSizing: 'border-box' }}
                />
              </div>
              <div className="form-group mb-3 w-100">
                {passwordError && <div className="alert alert-danger py-1 px-2 mb-2">{passwordError}</div>}
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg w-100"
                  id="password"
                  onChange={(e) => setpassword(e.target.value)}
                  value={password}
                  required
                  placeholder="Password"
                  autoComplete="current-password"
                  style={{ boxSizing: 'border-box' }}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-100 mb-2">Submit</button>
              {success && <div className="alert alert-success text-center">{success}</div>}
            </form>
            {servererror && <div className="alert alert-danger text-center mt-2">{servererror}</div>}
            <p className="forgot-password text-end mt-3">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loginform