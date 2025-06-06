import React, { useState } from "react";

function CustomerRegister() {
  const [form, setForm] = useState({
    customer_email: "",
    customer_phone_number: "",
    customer_first_name: "",
    customer_last_name: "",
    active_customer_status: 1,
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [customer, setCustomer] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setCustomer(null);

    try {
      const res = await fetch("http://localhost:5000/admin/addcustomer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(data.message || "Customer registered!");
        setCustomer(data.customer);
      } else {
        setError(data.message || data.error || "Registration failed.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow p-4">
            <h2 className="mb-4 text-center">Register Customer</h2>
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
                  type="text"
                  className="form-control"
                  name="customer_phone_number"
                  value={form.customer_phone_number}
                  onChange={handleChange}
                  required
                  placeholder="Enter phone number"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Active Status</label>
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
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
              {success && <div className="alert alert-success mt-3">{success}</div>}
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
            {customer && (
              <div className="mt-4">
                <h5>Registered Customer:</h5>
                <table className="table table-bordered table-sm">
                  <tbody>
                    <tr>
                      <th>ID</th>
                      <td>{customer.customerid}</td>
                    </tr>
                    <tr>
                      <th>First Name</th>
                      <td>{customer.customer_first_name}</td>
                    </tr>
                    <tr>
                      <th>Last Name</th>
                      <td>{customer.customer_last_name}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{customer.customer_email}</td>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <td>{customer.customer_phone_number}</td>
                    </tr>
                    <tr>
                      <th>Status</th>
                      <td>{customer.active_customer_status === 1 ? "Active" : "Inactive"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerRegister;