import React from 'react'
import logo from '../../../assets/assets/images/logo.png'
import './header.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '../../../context/Contextprovider'
import { Link } from 'react-router-dom'

function Header() {
  const { isloggedIn, employee, logout } = useAuth()

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="Logo" style={{ height: 40, marginRight: 10 }} />
            <span className="fw-bold">#1 Multibrand Car</span>
          </Link>
          {/* Responsive Login/Logout always visible */}
          <div className="d-flex align-items-center order-lg-2 ms-auto">
            {isloggedIn ? (
              <>
                <span className="me-2" style={{ color: 'black' }}>
                  Welcome, {employee.employee_first_name || employee.employee_firstname || employee.firstname || employee.firstName}
                </span>
                <Link to="/login" onClick={logout} className="btn btn-outline-danger btn-sm">Logout</Link>
              </>
            ) : (
              <Link to="/login" className="btn btn-outline-primary btn-sm">Login</Link>
            )}
          </div>
          <button
            className="navbar-toggler ms-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse order-lg-1" id="mainNavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Servecs">Services</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact Us</Link>
              </li>
                <li className="nav-item">
                <Link className="nav-link" to="/Project">Project Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Optional: Office hours bar */}
      <div className="bg-light text-center py-1 small">
        Monday - Saturday 7:00AM - 6:00PM
      </div>
    </header>
  )
}

export default Header