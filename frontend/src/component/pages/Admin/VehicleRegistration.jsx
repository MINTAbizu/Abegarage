import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VehicleRegistration = () => {
    const { customerId } = useParams();
    const navigate = useNavigate();
    
    // Form states
    const [form, setForm] = useState({
        vehicle_year: '',
        vehicle_make: '',
        vehicle_model: '',
        vehicle_type: '',
        vehicle_mileage: '',
        vehicle_tag: '',
        vehicle_serial: '',
        vehicle_color: ''
    });
    
    // UI states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [customerInfo, setCustomerInfo] = useState(null);

    useEffect(() => {
        // Fetch customer information
        const fetchCustomerInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/customers/customer/${customerId}`);
                setCustomerInfo(response.data.data);
            } catch (err) {
                setError('Failed to fetch customer information');
            }
        };
        fetchCustomerInfo();
    }, [customerId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!form.vehicle_year || !form.vehicle_make || !form.vehicle_model || 
            !form.vehicle_type || !form.vehicle_mileage || !form.vehicle_tag || 
            !form.vehicle_serial || !form.vehicle_color) {
            setError("All fields are required");
            return false;
        }

        const currentYear = new Date().getFullYear();
        const year = parseInt(form.vehicle_year);
        if (isNaN(year) || year < 1900 || year > currentYear) {
            setError(`Vehicle year must be between 1900 and ${currentYear}`);
            return false;
        }

        if (isNaN(form.vehicle_mileage) || form.vehicle_mileage < 0) {
            setError("Mileage must be a positive number");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/vehicles/admin/addvehicle', {
                customer_id: customerId,
                ...form
            });
            
            if (response.data) {
                setSuccess('Vehicle registered successfully!');
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register vehicle. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!customerInfo) {
        return (
            <div className="container mt-4">
                <div className="alert alert-info">
                    Loading customer information...
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h2 className="mb-0">Vehicle Registration</h2>
                        </div>
                        <div className="card-body">
                            <div className="mb-4">
                                <h5>Customer Information</h5>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p><strong>Name:</strong> {customerInfo.customer_first_name} {customerInfo.customer_last_name}</p>
                                        <p><strong>Email:</strong> {customerInfo.customer_email}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><strong>Phone:</strong> {customerInfo.customer_phone_number}</p>
                                        <p><strong>Status:</strong> {customerInfo.active_customer_status === 1 ? 'Active' : 'Inactive'}</p>
                                    </div>
                                </div>
                            </div>

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
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Year</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="vehicle_year"
                                                value={form.vehicle_year}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter vehicle year"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Make</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="vehicle_make"
                                                value={form.vehicle_make}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter vehicle make"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Model</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="vehicle_model"
                                                value={form.vehicle_model}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter vehicle model"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Type</label>
                                            <select
                                                className="form-select"
                                                name="vehicle_type"
                                                value={form.vehicle_type}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select Type</option>
                                                <option value="Sedan">Sedan</option>
                                                <option value="SUV">SUV</option>
                                                <option value="Truck">Truck</option>
                                                <option value="Van">Van</option>
                                                <option value="Coupe">Coupe</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Mileage</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="vehicle_mileage"
                                                value={form.vehicle_mileage}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter mileage"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Tag</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="vehicle_tag"
                                                value={form.vehicle_tag}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter vehicle tag"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Serial Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="vehicle_serial"
                                                value={form.vehicle_serial}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter serial number"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Color</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="vehicle_color"
                                                value={form.vehicle_color}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter vehicle color"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4">
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
                                            'Register Vehicle'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleRegistration;