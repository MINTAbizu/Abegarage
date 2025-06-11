import React, { useState } from "react";

function AddVehicle({ onAdd }) {
  const [form, setForm] = useState({
    vehicle_year: "",
    vehicle_make: "",
    vehicle_model: "",
    vehicle_type: "",
    vehicle_mileage: "",
    vehicle_tag: "",
    vehicle_vin: "",
    vehicle_color: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      // Replace with your backend endpoint
      const res = await fetch("http://localhost:5000/admin/addvehicle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Vehicle added successfully!");
        setForm({
          vehicle_year: "",
          vehicle_make: "",
          vehicle_model: "",
          vehicle_type: "",
          vehicle_mileage: "",
          vehicle_tag: "",
          vehicle_vin: "",
          vehicle_color: "",
        });
        if (onAdd) onAdd(data.vehicle);
      } else {
        setError(data.message || data.error || "Failed to add vehicle.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="card shadow p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Add a new vehicle <span style={{color: "#e60000"}}>___</span></h4>
        {/* You can add a close button here if needed */}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="vehicle_year"
            value={form.vehicle_year}
            onChange={handleChange}
            placeholder="Vehicle year"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="vehicle_make"
            value={form.vehicle_make}
            onChange={handleChange}
            placeholder="Vehicle make"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="vehicle_model"
            value={form.vehicle_model}
            onChange={handleChange}
            placeholder="Vehicle model"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="vehicle_type"
            value={form.vehicle_type}
            onChange={handleChange}
            placeholder="Vehicle type"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            name="vehicle_mileage"
            value={form.vehicle_mileage}
            onChange={handleChange}
            placeholder="Vehicle mileage"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="vehicle_tag"
            value={form.vehicle_tag}
            onChange={handleChange}
            placeholder="Vehicle tag"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="vehicle_vin"
            value={form.vehicle_vin}
            onChange={handleChange}
            placeholder="Vehicle serial"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="vehicle_color"
            value={form.vehicle_color}
            onChange={handleChange}
            placeholder="Vehicle color"
            required
          />
        </div>
        <button type="submit" className="btn btn-danger w-100" style={{fontWeight: 600}}>
          ADD VEHICLE
        </button>
        {success && <div className="alert alert-success mt-3">{success}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </form>
    </div>
  );
}

export default AddVehicle;