import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CustomerRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    customer_email: "",
    customer_phone_number: "",
    customer_first_name: "",
    customer_last_name: "",
    active_customer_status: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!form.customer_email || !form.customer_phone_number || 
        !form.customer_first_name || !form.customer_last_name) {
      setError("All fields are required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customer_email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!/^\d{10}$/.test(form.customer_phone_number.replace(/\D/g, ''))) {
      setError("Please enter a valid 10-digit phone number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/admin/addcustomer", form);
      
      if (response.data) {
        setSuccess("Customer registered successfully!");
        // Navigate to vehicle registration with the customer ID
        setTimeout(() => {
          navigate(`/vehicle-registration/${response.data.customer.customerid}`);
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register customer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow p-4">
            <h2 className="mb-4 text-center">Register Customer</h2>
            
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            
            {success && (
              <div className="alert alert-success" role="alert">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="customer_first_name"
                  value={form.customer_first_name}
                  onChange={handleChange}
                  required
                  placeholder="Enter first name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="customer_last_name"
                  value={form.customer_last_name}
                  onChange={handleChange}
                  required
                  placeholder="Enter last name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="customer_email"
                  value={form.customer_email}
                  onChange={handleChange}
                  required
                  placeholder="Enter email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  name="customer_phone_number"
                  value={form.customer_phone_number}
                  onChange={handleChange}
                  required
                  placeholder="Enter phone number"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="active_customer_status"
                  value={form.active_customer_status}
                  onChange={handleChange}
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Registering...
                  </>
                ) : (
                  'Register Customer'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerRegister;